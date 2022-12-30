namespace ElectronicsStore.Core.Abstractions;

/// <summary>
///     Search parameters to retrieve the items from the storage.
/// </summary>
public interface IGoodsSearchParameters
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
}