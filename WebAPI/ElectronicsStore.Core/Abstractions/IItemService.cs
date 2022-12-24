﻿using ElectronicsStore.Core.DataTransferObjects;

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

    /// <summary>
    /// Get items from storage by search parameters including navigation properties.
    /// </summary>
    /// <param name="pageNumber">search parameter that represents the page number</param>
    /// <param name="pageSize">search parameter that represents the number of items on the page</param>
    /// <returns>items matching the search parameters</returns>
    Task<IEnumerable<ItemDto>> GetItemsBySearchParametersAsync(int pageNumber, int pageSize);

    /// <summary>
    /// Get items count from storage by search parameters.
    /// </summary>
    /// <returns>number of items matching the search parameters.</returns>
    Task<int> GetItemsCountBySearchParametersAsync();

    // CREATE

    // UPDATE

    // DELETE
}