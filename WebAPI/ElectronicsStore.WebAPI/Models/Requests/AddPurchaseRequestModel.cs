using System.ComponentModel.DataAnnotations;

namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
///     Request model to create new purchase.
/// </summary>
public class AddPurchaseRequestModel
{
    /// <summary>
    ///     The count of items.
    ///     Values between 1 and 999 are allowed.
    /// </summary>
    [Range(1, 999)]
    public int Count { get; set; }

    /// <summary>
    ///     Cost of goods at the time of purchase.
    /// </summary>
    [Range(0.0, Int32.MaxValue)]
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