namespace ElectronicsStore.Core.Abstractions;

/// <summary>
///     Search parameters to retrieve the count of items from the storage.
/// </summary>
public interface IGoodsCountSearchParameters
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