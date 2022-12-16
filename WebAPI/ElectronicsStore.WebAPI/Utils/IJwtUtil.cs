using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.WebAPI.Models.Responses;

namespace ElectronicsStore.WebAPI.Utils;

public interface IJwtUtil
{
    Task<TokenResponse> GenerateTokenAsync(UserDto dto);
    Task RemoveRefreshTokenAsync(Guid requestRefreshToken);
}