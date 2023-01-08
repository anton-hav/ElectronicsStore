namespace ElectronicsStore.Core.Abstractions.IdentityManagers;

public interface IUserManager
{
    /// <summary>
    /// Get an user unique identifier.
    /// </summary>
    /// <returns>an user unique identifier as a <see cref="Guid>"/></returns>
    Guid GetUserId();

    /// <summary>
    /// Check if user has an admin role.
    /// </summary>
    /// <returns>A boolean</returns>
    bool IsAdmin();

    /// <summary>
    /// Check if user has an user role.
    /// </summary>
    /// <returns>A boolean</returns>
    bool IsUser();
}