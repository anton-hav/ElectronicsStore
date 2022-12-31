using ElectronicsStore.Core.DataTransferObjects;

namespace ElectronicsStore.Core.Abstractions;

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
    /// Get brands from the storage by search parameters.
    /// </summary>
    /// <param name="parameters">search parameters as a <see cref="IBrandSearchParameters"/></param>
    /// <returns>brands that match the search parameters</returns>
    Task<IEnumerable<BrandDto>> GetBrandsBySearchParametersAsync(IBrandSearchParameters parameters);

    // CREATE

    // UPDATE

    // DELETE
}