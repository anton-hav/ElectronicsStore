using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
/// Provide a brand filter model for searching.
/// </summary>
public class BrandSearchParameters : IBrandSearchParameters
{
    /// <inheritdoc />
    public string[]? BrandNames { get; set; }
}