namespace ElectronicsStore.Core.Abstractions.SearchParameters;

/// <summary>
/// Represent a category filter parameters.
/// </summary>
public interface ICategorySearchParameters
{
    /// <summary>
    /// Filter parameters that represents the goods category unique identifier.
    /// </summary>
    Guid? CategoryId { get; set; }
}