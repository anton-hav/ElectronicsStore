using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Core.Abstractions.SearchModels;

/// <summary>
///     Model for searching the brands in the storage.
/// </summary>
public interface IBrandSearchModel
{
    /// <summary>
    ///     Category parameters.
    /// </summary>
    ICategorySearchParameters Category { get; set; }
    /// <summary>
    ///     Price parameters.
    /// </summary>
    IPriceSearchParameters Price { get; set; }
}