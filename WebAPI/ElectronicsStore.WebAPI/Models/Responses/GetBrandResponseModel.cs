namespace ElectronicsStore.WebAPI.Models.Responses;

/// <summary>
/// Response model for one of brands
/// </summary>
public class GetBrandResponseModel
{
    /// <summary>
    /// An unique identifier
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Brand name
    /// </summary>
    public string Name { get; set; }
}