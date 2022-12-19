namespace ElectronicsStore.Core.DataTransferObjects;

/// <summary>
/// Brand information
/// </summary>
public class BrandDto
{
    /// <summary>
    /// An unique identifier
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Brand name
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// Products of the brand
    /// </summary>
    /// <remarks>
    /// Navigation property
    /// </remarks>
    public List<ProductDto> Products { get; set; }
}