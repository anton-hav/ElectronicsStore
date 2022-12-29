using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Business.ServiceImplementations;

/// <summary>
///     Class contains search parameters for retrieve items from the storage.
/// </summary>
public class GoodsSearchParameters : IGoodsSearchParameters
{
    /// <summary>
    ///     Pagination parameters.
    /// </summary>
    public IPaginationParameters Pagination { get; set; }

    /// <summary>
    ///     Category parameters.
    /// </summary>
    public ICategorySearchParameters Category { get; set; }
}