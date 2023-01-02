using System.Security.Cryptography;
using System.Text;
using AutoMapper;
using ElectronicsStore.Core.Abstractions.Services;
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


    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
        return (await _unitOfWork.Users.Get().ToListAsync())
            .Select(user => _mapper.Map<UserDto>(user)).ToArray();
    }

    /// <inheritdoc />
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

        throw new ArgumentException("User with specified email doesn't exist. ", nameof(email));
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<UserDto> GetUserByRefreshTokenAsync(Guid refreshToken)
    {
        var token = await _unitOfWork.RefreshToken
            .Get()
            .Include(token => token.User)
            .ThenInclude(user => user.Role)
            .AsNoTracking()
            .FirstOrDefaultAsync(token => token.Token.Equals(refreshToken));

        if (token != null) return _mapper.Map<UserDto>(token.User);

        throw new ArgumentException("Could not find a token with the specified model . ", nameof(refreshToken));
    }

    /// <inheritdoc />
    public async Task<bool> IsUserExistsAsync(string email)
    {
        return await _unitOfWork.Users.Get()
            .AnyAsync(user => user.Email.Equals(email));
    }

    /// <inheritdoc />
    public async Task<bool> CheckUserPasswordAsync(string email, string password)
    {
        var dbPasswordHash = (await _unitOfWork.Users
                .Get().FirstOrDefaultAsync(user => user.Email.Equals(email)))
            ?.PasswordHash;

        return
            dbPasswordHash != null
            && CreateMd5Hash(password).Equals(dbPasswordHash);
    }

    /// <inheritdoc />
    public bool IsUserTheFirst()
    {
        var entity = _unitOfWork.Users
            .Get()
            .AsNoTracking()
            .FirstOrDefault();

        return entity == null;
    }

    /// <inheritdoc />
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
        var passwordSalt = _configuration["Secrets:PasswordSalt"];

        using (var md5 = MD5.Create())
        {
            var inputBytes = Encoding.UTF8.GetBytes(password + passwordSalt);
            var hashBytes = md5.ComputeHash(inputBytes);

            return Convert.ToHexString(hashBytes);
        }
    }
}