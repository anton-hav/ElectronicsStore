namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
/// Request model to get purchases
/// </summary>
public class GetPurchasesRequestModel
{
    /// <summary>
    /// Search parameter that represents the order id.
    /// To ignore the search parameter, the value must be empty.
    /// </summary>
    public Guid? OrderId { get; set; }
}