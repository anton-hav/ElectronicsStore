namespace ElectronicsStore.Core.DataTransferObjects;

/// <summary>
/// Product information
/// </summary>
public class ProductDto
{
    /// <summary>
    /// An unique identifier
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Product name
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// An unique identifier of the brand of the product
    /// </summary>
    public Guid BrandId { get; set; }
    /// <summary>
    /// Brand
    /// </summary>
    /// <remarks>
    /// Navigation property
    /// </remarks>
    public BrandDto Brand { get; set; }
}