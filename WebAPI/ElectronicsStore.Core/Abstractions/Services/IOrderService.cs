using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.Core.Abstractions.Services;

public interface IOrderService
{
    // READ

    /// <summary>
    /// Get order with specified id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid"/></param>
    /// <returns>An order that matches the id</returns>
    Task<OrderDto> GetByIdAsync(Guid id);

    /// <summary>
    /// Checks if the record with the same creation date and user id exists in the storage.
    /// </summary>
    /// <param name="orderCreationDate">creation date as a <see cref="DateTime"/></param>
    /// <param name="userId">an unique identifier of the creator</param>
    /// <returns>A boolean</returns>
    Task<bool> IsOrderExistByCreationDateAndUserIdAsync(DateTime orderCreationDate, Guid userId);

    // CREATE

    /// <summary>
    /// Create a new order record in the storage.
    /// </summary>
    /// <param name="dto">an order to create as a <see cref="OrderDto"/></param>
    /// <returns>the number of successfully created records in the storage.</returns>
    Task<int> CreateAsync(OrderDto dto);

    // UPDATE

    // REMOVE
}