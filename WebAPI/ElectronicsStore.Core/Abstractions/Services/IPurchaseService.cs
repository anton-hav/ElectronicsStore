using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.Core.Abstractions.Services;

public interface IPurchaseService
{
    // READ

    /// <summary>
    /// Get the purchase with specified id from the storage.
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid"/></param>
    /// <returns>A purchase that matches the id.</returns>
    Task<PurchaseDto> GetByIdAsync(Guid id);

    /// <summary>
    /// Get purchases from storage by search model.
    /// </summary>
    /// <param name="model">search parameters as a <see cref="IPurchasesSearchModel"/></param>
    /// <returns>purchases matching the search model</returns>
    Task<IEnumerable<PurchaseDto>> GetPurchasesBySearchParametersAsync(IPurchasesSearchModel model);

    /// <summary>
    /// Checks if the record with the same parameters exists in the storage.
    /// </summary>
    /// <param name="orderId">an unique identifier of the order.</param>
    /// <param name="itemId">an unique identifier of the item.</param>
    /// <returns>A boolean</returns>
    Task<bool> IsPurchaseExistByOrderIdAndItemIdAsync(Guid orderId, Guid itemId);

    // CREATE

    /// <summary>
    /// Create a new purchase in the storage.
    /// </summary>
    /// <param name="dto">a purchase to create as a <see cref="PurchaseDto"/></param>
    /// <returns>the number of successfully created records in the storage.</returns>
    Task<int> CreateAsync(PurchaseDto dto);

    // UPDATE

    // REMOVE
}