using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
///     Class contains search parameters for retrieve max price of items.
/// </summary>
public class GoodsMaxPriceSearchParameters : IGoodsMaxPriceSearchParameters
{
    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }
}