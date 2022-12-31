namespace ElectronicsStore.Core.Abstractions;

/// <summary>
///     Search parameters to retrieve the max price of items from the storage.
/// </summary>
public interface IGoodsMaxPriceSearchParameters
{
    /// <summary>
    ///     Category parameters.
    /// </summary>
    ICategorySearchParameters Category { get; set; }
}