namespace ElectronicsStore.WebAPI.Models.Responses;

/// <summary>
/// Response model for one of goods
/// </summary>
public class GetItemResponseModel
{
    /// <summary>
    /// An item unique identifier
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// Product name
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// Short summary
    /// </summary>
    public string Summary { get; set; }
    /// <summary>
    /// Descriptions
    /// </summary>
    public string Description { get; set; }
    /// <summary>
    /// Cost of the product
    /// </summary>
    public double Cost { get; set; }
    /// <summary>
    /// Brand name
    /// </summary>
    public string Brand { get; set; }
}