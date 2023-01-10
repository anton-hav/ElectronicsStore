using ElectronicsStore.Core;

namespace ElectronicsStore.WebAPI.Models.Responses;

/// <summary>
/// Order response model
/// </summary>
public class GetOrderResponseModel
{
    /// <summary>
    /// An unique identifier.
    /// </summary>
    public Guid Id { get; set; }
    /// <summary>
    /// An unique identifier of order creator.
    /// </summary>
    public Guid UserId { get; set; }
    /// <summary>
    /// Status of the order.
    /// </summary>
    public OrderStatus Status { get; set; }
    /// <summary>
    /// Creation date.
    /// </summary>
    public DateTime DateTimeOfCreate { get; set; }

}