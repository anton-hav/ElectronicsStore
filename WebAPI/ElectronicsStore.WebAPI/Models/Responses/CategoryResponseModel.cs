using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.WebAPI.Models.Responses;

/// <summary>
/// Response model for the goods category
/// </summary>
public class CategoryResponseModel
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
}