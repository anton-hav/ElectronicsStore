namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
///     Request model to get categories.
/// </summary>
public class GetCategoriesRequestModel
{
    /// <summary>
    ///     The unique identifier of the parent category for the requested records.
    ///     (For the root category the value should be empty).
    /// </summary>
    public Guid? ParentCategoryId { get; set; }
}