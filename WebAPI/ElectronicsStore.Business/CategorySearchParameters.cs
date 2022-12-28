using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Business;

/// <summary>
/// Represent a category filter parameters for searching goods.
/// </summary>
public class CategorySearchParameters : ICategorySearchParameters
{
    /// <inheritdoc />
    public Guid? CategoryId { get; set; }
}