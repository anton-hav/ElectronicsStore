namespace ElectronicsStore.Core.Abstractions.SearchParameters;

/// <summary>
/// Represent a price filter parameters.
/// </summary>
public interface IPriceSearchParameters
{
    /// <summary>
    /// Filter parameter that represents the "Price From".
    /// </summary>
    int? From { get; set; }
    /// <summary>
    /// Filter parameter that represents the "Price To".
    /// </summary>
    int? To { get; set; }
}