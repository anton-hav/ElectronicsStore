using ElectronicsStore.Core.Abstractions.SearchModels;
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
    /// Get orders from the storage by search model.
    /// </summary>
    /// <param name="model">search parameters as a <see cref="IOrdersSearchModel"/></param>
    /// <returns>orders matching the search model</returns>
    Task<IEnumerable<OrderDto>> GetOrdersBySearchParametersAsync(IOrdersSearchModel model);

    /// <summary>
    /// Checks if the record with the same creation date and user id exists in the storage.
    /// </summary>
    /// <param name="orderCreationDate">creation date as a <see cref="DateTime"/></param>
    /// <param name="userId">an unique identifier of the creator</param>
    /// <returns>A boolean</returns>
    Task<bool> IsOrderExistByCreationDateAndUserIdAsync(DateTime orderCreationDate, Guid userId);

    /// <summary>
    /// Checks if the record exists in the storage by Id.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid"/></param>
    /// <returns>A boolean</returns>
    Task<bool> IsOrderExistByIdAsync(Guid id);

    // CREATE

    /// <summary>
    /// Create a new order record in the storage.
    /// </summary>
    /// <param name="dto">an order to create as a <see cref="OrderDto"/></param>
    /// <returns>the number of successfully created records in the storage.</returns>
    Task<int> CreateAsync(OrderDto dto);

    // UPDATE

    /// <summary>
    /// Patch order with specified id in the storage
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid"/></param>
    /// <param name="dto"><see cref="OrderDto"/></param>
    /// <returns>the number of successfully patched records in the storage.</returns>
    Task<int> PatchAsync(Guid id, OrderDto dto);

    // REMOVE
}