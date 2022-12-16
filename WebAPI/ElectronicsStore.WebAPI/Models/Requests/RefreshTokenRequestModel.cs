namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
/// Model for request new access token by the refresh token value
/// </summary>
public class RefreshTokenRequestModel
{
    /// <summary>
    /// Refresh token value
    /// </summary>
    public Guid RefreshToken { get; set; }
}