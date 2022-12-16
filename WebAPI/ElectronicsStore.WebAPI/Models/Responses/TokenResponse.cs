namespace ElectronicsStore.WebAPI.Models.Responses;

/// <summary>
/// Model for returning access token from API
/// </summary>
public class TokenResponse
{
    /// <summary>
    /// An access token as a string.
    /// </summary>
    public string AccessToken { get; set; }
    /// <summary>
    /// Role name for current user
    /// </summary>
    public string Role { get; set; }
    /// <summary>
    /// Unique identifier of the user for which the access token was created
    /// </summary>
    public Guid UserId { get; set; }
    /// <summary>
    /// Token expiration
    /// </summary>
    public DateTime TokenExpiration { get; set; }
    /// <summary>
    /// Refresh token value
    /// </summary>
    public Guid RefreshToken { get; set; }
}