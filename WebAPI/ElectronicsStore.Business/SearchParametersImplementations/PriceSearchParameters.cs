using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
/// Represent a price filter parameters for searching goods.
/// </summary>
public class PriceSearchParameters : IPriceSearchParameters
{
    /// <inheritdoc />
    public int? From { get; set; }
    /// <inheritdoc />
    public int? To { get; set; }
}