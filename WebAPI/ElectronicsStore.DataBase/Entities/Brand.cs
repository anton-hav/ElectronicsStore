namespace ElectronicsStore.DataBase.Entities;

/// <summary>
/// Brand information
/// </summary>
public class Brand : IBaseEntity
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
    public List<Product> Products { get; set; }
}