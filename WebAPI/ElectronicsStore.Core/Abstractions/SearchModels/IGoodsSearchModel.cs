using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Core.Abstractions.SearchModels;

/// <summary>
///     Model for searching the items in the storage.
/// </summary>
public interface IGoodsSearchModel
{
    /// <summary>
    ///     Pagination parameters.
    /// </summary>
    IPaginationParameters Pagination { get; set; }

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