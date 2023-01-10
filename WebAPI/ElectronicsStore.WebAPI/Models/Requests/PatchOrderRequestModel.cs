using ElectronicsStore.Core;

namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
/// Request model to patch order.
/// </summary>
public class PatchOrderRequestModel
{
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