namespace ElectronicsStore.Core.Abstractions.SearchParameters;

/// <summary>
/// Represent a custom searches filter.
/// </summary>
public interface ISearchesSearchParameters
{
    /// <summary>
    /// Filter parameters, which are user-defined search terms that users send to the search bar.
    /// </summary>
    string[]? Searches { get; set; }
}