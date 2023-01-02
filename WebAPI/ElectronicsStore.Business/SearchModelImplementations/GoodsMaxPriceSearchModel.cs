using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchModelImplementations;

/// <summary>
///     Class contains search model for retrieve max price of items.
/// </summary>
public class GoodsMaxPriceSearchModel : IGoodsMaxPriceSearchModel
{
    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }
}