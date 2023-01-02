namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
/// Request model to get items count.
/// </summary>
public class GetGoodsCountRequestModel
{
    /// <summary>
    /// Search parameter that represents the category of goods.
    /// </summary>
    public Guid? CategoryId { get; set; }

    /// <summary>
    /// Search parameter that represents the "Price From" price filter value.
    /// To ignore the search parameter, the value must be empty.
    /// </summary>
    public int? From { get; set; }

    /// <summary>
    /// Search parameter that represents the "Price To" price filter value.
    /// To ignore the search parameter, the value must be empty.
    /// </summary>
    public int? To { get; set; } = null;

    /// <summary>
    /// Search parameter that represents the brand filter values.
    /// To ignore the search parameter, the value must be empty.
    /// </summary>
    public string[]? Brands { get; set; }
}