using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.Core.Abstractions.Services;

public interface IBrandService
{
    // READ

    /// <summary>
    /// Get brand with specified id from the storage
    /// </summary>
    /// <param name="id">an unique identifier as a <see cref="Guid"/></param>
    /// <returns>The brand matching the identifier as a <see cref="BrandDto"/></returns>
    Task<BrandDto> GetByIdAsync(Guid id);

    /// <summary>
    /// Get brands from the storage by search model.
    /// </summary>
    /// <param name="model">search model as a <see cref="IBrandSearchModel"/></param>
    /// <returns>brands that match the search model</returns>
    Task<IEnumerable<BrandDto>> GetBrandsBySearchParametersAsync(IBrandSearchModel model);

    // CREATE

    // UPDATE

    // DELETE
}