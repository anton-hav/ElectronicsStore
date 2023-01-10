namespace ElectronicsStore.DataBase.Entities;

/// <summary>
///     Goods category
/// </summary>
public class Category : IBaseEntity
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
    public Category? ParentCategory { get; set; }

    /// <summary>
    ///     List of child categories
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public List<Category> Children { get; set; }

    /// <summary>
    ///     List of items in the current category
    /// </summary>
    /// <remarks>
    ///     Navigation property
    /// </remarks>
    public List<Item> Items { get; set; }
}