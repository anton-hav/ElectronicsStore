namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
/// Request model to get brands
/// </summary>
public class GetBrandsRequestModel
{
    /// <summary>
    /// Search parameter that represents the goods category unique identifier.
    /// To ignore the search parameter, the value must be empty.
    /// </summary>
    public Guid? CategoryId { get; set; }

    /// <summary>
    /// Search parameter that represents the "Price From" price filter value.
    /// To ignore the search parameter, the value must be empty.
    /// </summary>
    public int? From { get; set; }

    /// <summary>
    /// Search parameter that represents the "Price To" price filter value.
    /// To ignore the search parameter, the value must be empty.
    /// </summary>
    public int? To { get; set; } = null;
}