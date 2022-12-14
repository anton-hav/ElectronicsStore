using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.Core.Abstractions;

public interface IUserService
{
    //READ
    Task<UserDto> GetUserByEmailAsync(string email);
    Task<bool> IsUserExistsAsync(string email);
    Task<bool> CheckUserPasswordAsync(string email, string password);
    bool IsUserTheFirst();

    //CREATE
    Task<int> RegisterUserAsync(UserDto dto);

    //UPDATE

    //REMOVE
}