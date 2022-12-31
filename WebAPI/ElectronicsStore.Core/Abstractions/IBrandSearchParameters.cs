namespace ElectronicsStore.Core.Abstractions;

/// <summary>
///     Search parameters to retrieve the brands from the storage.
/// </summary>
public interface IBrandSearchParameters
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