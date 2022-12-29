namespace ReadingList.WebAPI.Models.Requests;

/// <summary>
/// Request model to create or update category
/// </summary>
public class AddOrUpdateCategoryRequestModel
{
    /// <summary>
    /// Category name
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