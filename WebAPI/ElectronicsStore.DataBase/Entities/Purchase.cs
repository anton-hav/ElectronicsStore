namespace ElectronicsStore.DataBase.Entities;

/// <summary>
///     Purchase information.
/// </summary>
public class Purchase : IBaseEntity
{
    /// <summary>
    ///     An unique identifier.
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    ///     The count of items.
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

    /// <summary>
    ///     Order.
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public Order Order { get; set; }

    /// <summary>
    ///     Item.
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public Item Item { get; set; }
}