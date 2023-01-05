using ElectronicsStore.Core;

namespace ElectronicsStore.WebAPI.Models.Requests;

/// <summary>
/// Request model to create new order.
/// </summary>
public class AddOrderModel
{
    /// <summary>
    /// Creation date.
    /// </summary>
    public DateTime DateTimeOfCreate { get; set; }
    /// <summary>
    /// An unique identifier of the order creator.
    /// </summary>
    public Guid UserId { get; set; }
}