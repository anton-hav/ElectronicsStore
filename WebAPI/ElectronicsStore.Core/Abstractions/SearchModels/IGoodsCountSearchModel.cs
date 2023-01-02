using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Core.Abstractions.SearchModels;

/// <summary>
///     Model for searching the count of items in the storage.
/// </summary>
public interface IGoodsCountSearchModel
{
    /// <summary>
    ///     Category parameters.
    /// </summary>
    ICategorySearchParameters Category { get; set; }

    /// <summary>
    ///     Price parameters.
    /// </summary>
    IPriceSearchParameters Price { get; set; }

    /// <summary>
    ///     Brands parameters.
    /// </summary>
    IBrandSearchParameters Brands { get; set; }
}