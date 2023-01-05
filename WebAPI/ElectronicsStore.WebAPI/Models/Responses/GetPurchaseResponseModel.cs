namespace ElectronicsStore.WebAPI.Models.Responses;

/// <summary>
/// A purchase response model.
/// </summary>
public class GetPurchaseResponseModel
{
    /// <summary>
    ///     An unique identifier.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    ///     The count of the item.
    /// </summary>
    public int Count { get; set; }

    /// <summary>
    ///     Cost of goods at the time of purchase.
    /// </summary>
    public double Cost { get; set; }

    /// <summary>
    ///     An unique identifier of the order.
    /// </summary>
    public Guid OrderId { get; set; }

    /// <summary>
    ///     An unique identifier of the item.
    /// </summary>
    public Guid ItemId { get; set; }
}