namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
/// Login model
/// </summary>
public class LoginUserRequestModel
{
    /// <summary>
    /// User email
    /// </summary>
    public string Email { get; set; }
    /// <summary>
    /// User password
    /// </summary>
    public string Password { get; set; }
}