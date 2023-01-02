using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.Core.Abstractions.Services;

public interface IUserService
{
    //READ
    Task<IEnumerable<UserDto>> GetAllUsersAsync();

    /// <summary>
    /// Gets user by email as a string
    /// </summary>
    /// <param name="email">user email as a string</param>
    /// <returns>an user as a <see cref="UserDto"/></returns>
    Task<UserDto> GetUserByEmailAsync(string email);

    /// <summary>
    /// Gets user from storage by refresh token
    /// </summary>
    /// <param name="refreshToken">a refresh token as a <see cref="Guid"/></param>
    /// <returns>an user as a <see cref="UserDto"/></returns>
    Task<UserDto> GetUserByRefreshTokenAsync(Guid refreshToken);

    /// <summary>
    /// Checks if the user exists in the data source.
    /// </summary>
    /// <param name="email">user email as a string</param>
    /// <returns>a Boolean</returns>
    Task<bool> IsUserExistsAsync(string email);

    /// <summary>
    /// Checks if the user password corrects
    /// </summary>
    /// <param name="email">user email as a string</param>
    /// <param name="password">user password as a string</param>
    /// <returns>a Boolean</returns>
    Task<bool> CheckUserPasswordAsync(string email, string password);

    /// <summary>
    /// Checks if the user is the first record in the data source.
    /// </summary>
    /// <returns>The Boolean</returns>
    bool IsUserTheFirst();

    //CREATE

    /// <summary>
    /// Creates a new user record in the data source.
    /// </summary>
    /// <remarks>
    /// Creates the user record as an Admin if this is the first record, otherwise, it registers as a User.
    /// </remarks>
    /// <param name="dto"></param>
    /// <returns>the number of successfully created records.</returns>
    Task<int> RegisterUserAsync(UserDto dto);

    //UPDATE

    //REMOVE
}