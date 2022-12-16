namespace ElectronicsStore.WebAPI.Models.Responses;

/// <summary>
/// Model for returning errors from api
/// </summary>
public class ErrorModel
{
    /// <summary>
    /// Error message
    /// </summary>
    public string? Message { get; set; }
}