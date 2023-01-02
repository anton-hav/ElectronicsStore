using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
/// Represent a price filter model for searching goods.
/// </summary>
public class PriceSearchParameters : IPriceSearchParameters
{
    /// <inheritdoc />
    public int? From { get; set; }
    /// <inheritdoc />
    public int? To { get; set; }
}