using System.Security.Authentication;
using ElectronicsStore.Core.Abstractions.IdentityManagers;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.DataBase.Entities;
using System.Security.Claims;

namespace ElectronicsStore.WebAPI.IdentityManagers;

public class UserManager : IUserManager
{
    private readonly IHttpContextAccessor _contextAccessor;
    private HttpContext _context;
    private readonly IUserService _userService;
    private readonly IRoleService _roleService;

    public UserManager(IHttpContextAccessor contextAccessor,
        IUserService userService, 
        IRoleService roleService)
    {
        _contextAccessor = contextAccessor;
        _userService = userService;
        _roleService = roleService;
    }

    private HttpContext Context
    {
        get
        {
            var context = _context ?? _contextAccessor?.HttpContext;
            if (context == null) throw new InvalidOperationException("HttpContext must not be null.");
            return context;
        }
        set => _context = value;
    }
    /// <inheritdoc />
    public Guid GetUserId()
    {
        var userClaim = Context.User.Claims
            .FirstOrDefault(claim => claim.Type.Equals(ClaimTypes.NameIdentifier) && Guid.TryParse(claim.Value, out _));
        if (userClaim == null)
            throw new AuthenticationException(nameof(userClaim));

        var userId = Guid.Parse(userClaim.Value);

        return userId;
    }

    /// <inheritdoc />
    public bool IsAdmin()
    {
        var roleName = GetRoleName();
        var adminRoleNameByDefault = _roleService.GetDefaultRoleNameForAdmin();
        return roleName.Equals(adminRoleNameByDefault);
    }

    /// <inheritdoc />
    public bool IsUser()
    {
        var roleName = GetRoleName();
        var userRoleNameByDefault = _roleService.GetDefaultRoleNameForUser();
        return roleName.Equals(userRoleNameByDefault);
    }

    /// <summary>
    ///     Gets the role for the current access token.
    /// </summary>
    /// <returns>the role as a string</returns>
    /// <exception cref="AuthenticationException"></exception>
    private string GetRoleName()
    {
        var roleClaim = Context.User.Claims
            .FirstOrDefault(claim => claim.Type.Equals(ClaimTypes.Role));

        if (roleClaim == null) throw new AuthenticationException(nameof(roleClaim));

        return roleClaim.Value;
    }
}