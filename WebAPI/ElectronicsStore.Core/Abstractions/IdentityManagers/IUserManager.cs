namespace ElectronicsStore.Core.Abstractions.IdentityManagers;

public interface IUserManager
{
    /// <summary>
    /// Get an user unique identifier.
    /// </summary>
    /// <returns>an user unique identifier as a <see cref="Guid>"/></returns>
    Guid GetUserId();
}