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

    public UserManager(IHttpContextAccessor contextAccessor,
        IUserService userService)
    {
        _contextAccessor = contextAccessor;
        _userService = userService;
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
}