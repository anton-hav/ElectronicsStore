namespace ElectronicsStore.Core.Abstractions.SearchParameters;

/// <summary>
/// Represent a brand filter parameters.
/// </summary>
public interface IBrandSearchParameters
{
    /// <summary>
    /// Filter parameters that represents names of the selected brands.
    /// </summary>
    string[]? BrandNames { get; set; }
}