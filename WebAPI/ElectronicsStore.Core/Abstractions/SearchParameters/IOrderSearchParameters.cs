namespace ElectronicsStore.Core.Abstractions.SearchParameters;

/// <summary>
/// Represent the search parameters related to the order.
/// </summary>
public interface IOrderSearchParameters
{
    /// <summary>
    ///     Search parameter that represents the order id.
    /// </summary>
    Guid? OrderId { get; set; }
}