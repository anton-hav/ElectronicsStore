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
}