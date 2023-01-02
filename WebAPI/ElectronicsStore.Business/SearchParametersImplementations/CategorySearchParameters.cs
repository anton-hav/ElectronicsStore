using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
/// Represent a category filter model for searching goods.
/// </summary>
public class CategorySearchParameters : ICategorySearchParameters
{
    /// <inheritdoc />
    public Guid? CategoryId { get; set; }
}