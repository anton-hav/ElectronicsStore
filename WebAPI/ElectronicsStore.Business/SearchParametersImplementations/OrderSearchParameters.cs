using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
/// Represent the search parameters related to the order.
/// </summary>
public class OrderSearchParameters : IOrderSearchParameters
{
    /// <inheritdoc />
    public Guid? OrderId { get; set; }
}