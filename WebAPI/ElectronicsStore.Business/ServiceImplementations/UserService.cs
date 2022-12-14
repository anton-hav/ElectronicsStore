using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.Data.Abstractions;
using ElectronicsStore.DataBase.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ElectronicsStore.Business.ServiceImplementations;

public class UserService : IUserService
{
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IRoleService _roleService;

    public UserService(IMapper mapper,
        IConfiguration configuration,
        IUnitOfWork unitOfWork,
        IRoleService roleService)
    {
        _mapper = mapper;
        _configuration = configuration;
        _unitOfWork = unitOfWork;
        _roleService = roleService;
    }

    /// <summary>
    ///     Gets user by email as a string
    /// </summary>
    /// <param name="email">user email as a string</param>
    /// <returns>The Task&lt;Result&gt; where Result is UserDto</returns>
    /// <exception cref="ArgumentException"></exception>
    public async Task<UserDto> GetUserByEmailAsync(string email)
    {
        var user = await _unitOfWork.Users
            .FindBy(us => us.Email.Equals(email),
                us => us.Role)
            .AsNoTracking()
            .Select(user => _mapper.Map<UserDto>(user))
            .FirstOrDefaultAsync();
        if (user != null) return user;

        throw new ArgumentException(nameof(email));
    }

    /// <summary>
    ///     Checks if the user exists in the data source.
    /// </summary>
    /// <param name="email">user email as a string</param>
    /// <returns>The Task&lt;Result&gt; where Result is the Boolean</returns>
    public async Task<bool> IsUserExistsAsync(string email)
    {
        return await _unitOfWork.Users.Get()
            .AnyAsync(user => user.Email.Equals(email));
    }

    /// <summary>
    ///     Checks if the user password corrects
    /// </summary>
    /// <param name="email">user email as a string</param>
    /// <param name="password">user password as a string</param>
    /// <returns>The Task&lt;Result&gt; where Result is the Boolean</returns>
    public async Task<bool> CheckUserPasswordAsync(string email, string password)
    {
        var dbPasswordHash = (await _unitOfWork.Users
                .Get().FirstOrDefaultAsync(user => user.Email.Equals(email)))
            ?.PasswordHash;

        return
            dbPasswordHash != null
            && CreateMd5Hash(password).Equals(dbPasswordHash);
    }

    /// <summary>
    ///     Checks if the user is the first record in the data source.
    /// </summary>
    /// <returns>The Boolean</returns>
    public bool IsUserTheFirst()
    {
        var entity = _unitOfWork.Users
            .Get()
            .AsNoTracking()
            .FirstOrDefault();

        return entity == null;
    }

    /// <summary>
    ///     Creates a new user record in the data source.
    /// </summary>
    /// <remarks>
    ///     Creates the user record as an Admin if this is the first record, otherwise, it registers as a User.
    /// </remarks>
    /// <param name="dto"></param>
    /// <returns>The Task&lt;Result&gt; where Result is the number of successfully created records.</returns>
    public async Task<int> RegisterUserAsync(UserDto dto)
    {
        var roleId = IsUserTheFirst()
            ? await _roleService.GetRoleIdForAdminRoleAsync()
            : await _roleService.GetRoleIdForDefaultRoleAsync();

        dto.RoleId = roleId;
        var user = _mapper.Map<User>(dto);

        //todo: should be reforge
        user.PasswordHash = CreateMd5Hash(dto.Password);

        await _unitOfWork.Users.AddAsync(user);
        return await _unitOfWork.Commit();
    }

    /// <summary>
    ///     Creates MD5 hash
    /// </summary>
    /// <param name="password">a password as a string</param>
    /// <returns>The hash as a string</returns>
    private string CreateMd5Hash(string password)
    {
        var passwordSalt = _configuration["UserSecrets:PasswordSalt"];

        using (var md5 = MD5.Create())
        {
            var inputBytes = Encoding.UTF8.GetBytes(password + passwordSalt);
            var hashBytes = md5.ComputeHash(inputBytes);

            return Convert.ToHexString(hashBytes);
        }
    }
}