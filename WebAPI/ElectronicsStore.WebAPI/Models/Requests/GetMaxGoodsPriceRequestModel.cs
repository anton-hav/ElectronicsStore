namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
/// Request model to get max price of goods.
/// </summary>
public class GetMaxGoodsPriceRequestModel
{
    /// <summary>
    /// Search parameter that represents the category of goods.
    /// </summary>
    public Guid? CategoryId { get; set; }
}