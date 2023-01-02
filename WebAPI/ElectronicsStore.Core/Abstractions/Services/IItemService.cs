using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.Core.Abstractions.Services;

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
    /// Get items from storage by search model including navigation properties.
    /// </summary>
    /// <param name="model">search parameter as a <see cref="IGoodsSearchModel"/></param>
    /// <returns>items matching the search model</returns>
    Task<IEnumerable<ItemDto>> GetItemsBySearchParametersAsync(IGoodsSearchModel model);

    /// <summary>
    /// Get items count from storage by search model.
    /// </summary>
    /// <param name="model">search parameter as a <see cref="IGoodsCountSearchModel"/></param>
    /// <returns>number of items matching the search model.</returns>
    Task<int> GetItemsCountBySearchParametersAsync(IGoodsCountSearchModel model);

    /// <summary>
    /// Get the maximum value of the items by search model.
    /// </summary>
    /// <param name="model">search parameter as a <see cref="IGoodsMaxPriceSearchModel"/></param>
    /// <returns>maximum price of items matching the search model.</returns>
    Task<double> GetMaxItemsPriceBySearchParametersAsync(IGoodsMaxPriceSearchModel model);

    // CREATE

    // UPDATE

    // DELETE
}