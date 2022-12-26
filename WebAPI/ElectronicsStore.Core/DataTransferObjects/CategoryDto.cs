namespace ElectronicsStore.Core.DataTransferObjects;

/// <summary>
/// Goods category data transfer object
/// </summary>
public class CategoryDto
{
    /// <summary>
    ///     An unique identifier
    /// </summary>
    public Guid Id { get; set; }

    /// <summary>
    ///     Goods category name
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    ///     The unique identifier of the parent category for the current entry.
    /// </summary>
    /// <remarks>
    ///     For the root category the value is null
    /// </remarks>
    public Guid? ParentCategoryId { get; set; }

    /// <summary>
    ///     Parent category.
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public CategoryDto? ParentCategory { get; set; }

    /// <summary>
    ///     List of child categories
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public List<CategoryDto> Children { get; set; }
}