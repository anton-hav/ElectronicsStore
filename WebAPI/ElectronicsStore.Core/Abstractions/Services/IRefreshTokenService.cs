namespace ElectronicsStore.Core.Abstractions.Services;

public interface IRefreshTokenService
{
    // READ

    // CREATE

    /// <summary>
    /// Create a new update marker with the specified value for the specified user.
    /// </summary>
    /// <param name="tokenValue">token value as a <see cref="Guid"/></param>
    /// <param name="userId">an user unique identifier as a <see cref="Guid"/></param>
    /// <returns>the number of successfully created records in the storage.</returns>
    Task<int> CreateRefreshTokenAsync(Guid tokenValue, Guid userId);

    // UPDATE

    // DELETE

    /// <summary>
    /// Removes token from storage specified token value
    /// </summary>
    /// <param name="tokenValue">token value as a <see cref="Guid"/></param>
    /// <returns>the number of successfully removed records in the storage.</returns>
    Task<int> RemoveRefreshTokenAsync(Guid tokenValue);
}