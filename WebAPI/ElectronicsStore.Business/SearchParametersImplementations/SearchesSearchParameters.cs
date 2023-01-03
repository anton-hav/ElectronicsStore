using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
/// Provide a search bar filter for searching.
/// </summary>
public class SearchesSearchParameters : ISearchesSearchParameters
{
    /// <inheritdoc />
    public string[]? Searches { get; set; }
}