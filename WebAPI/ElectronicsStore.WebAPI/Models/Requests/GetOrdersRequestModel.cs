namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
/// Request model to get orders
/// </summary>
public class GetOrdersRequestModel
{
    public Guid? UserId { get; set; }
}