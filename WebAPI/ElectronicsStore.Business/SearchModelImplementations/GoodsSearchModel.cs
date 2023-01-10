using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchModelImplementations;

/// <summary>
///     Class contains search model for retrieve items from the storage.
/// </summary>
public class GoodsSearchModel : IGoodsSearchModel
{
    /// <inheritdoc />
    public IPaginationParameters Pagination { get; set; }

    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }

    /// <inheritdoc />
    public IPriceSearchParameters Price { get; set; }

    /// <inheritdoc />
    public IBrandSearchParameters Brands { get; set; }

    /// <inheritdoc />
    public ISearchesSearchParameters Searches { get; set; }
}