namespace ElectronicsStore.DataBase.Entities;

/// <summary>
/// Product information
/// </summary>
public class Product : IBaseEntity
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
    public Brand Brand { get; set; }
}