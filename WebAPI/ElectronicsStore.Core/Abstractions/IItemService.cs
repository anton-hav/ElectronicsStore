using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.Core.Abstractions;

public interface IItemService
{
    // READ

    /// <summary>
    /// Get item with specified id from the storage including navigation properties.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid"/></param>
    /// <returns>an item as a <see cref="ItemDto"/></returns>
    Task<ItemDto> GetItemWithPropertiesByIdAsync(Guid id);

    /// <summary>
    /// Get all items from the storage
    /// </summary>
    /// <returns>all goods</returns>
    Task<IEnumerable<ItemDto>> GetAllItemsWithPropertiesAsync();

    // CREATE

    // UPDATE

    // DELETE
}