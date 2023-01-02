using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Core.Abstractions.SearchModels;

/// <summary>
///     Model for searching the max price of items in the storage.
/// </summary>
public interface IGoodsMaxPriceSearchModel
{
    /// <summary>
    ///     Category parameters.
    /// </summary>
    ICategorySearchParameters Category { get; set; }
}