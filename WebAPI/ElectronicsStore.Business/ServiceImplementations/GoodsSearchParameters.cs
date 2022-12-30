using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Business.ServiceImplementations;

/// <summary>
///     Class contains search parameters for retrieve items from the storage.
/// </summary>
public class GoodsSearchParameters : IGoodsSearchParameters
{
    /// <inheritdoc />
    public IPaginationParameters Pagination { get; set; }

    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }

    /// <inheritdoc />
    public IPriceSearchParameters Price { get; set; }
}