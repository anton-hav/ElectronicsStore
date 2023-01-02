using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
/// Provide a category filter model for searching.
/// </summary>
public class CategorySearchParameters : ICategorySearchParameters
{
    /// <inheritdoc />
    public Guid? CategoryId { get; set; }
}