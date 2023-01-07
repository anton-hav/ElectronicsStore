using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Core.Abstractions.SearchModels;

/// <summary>
/// Model for searching purchases in the storage.
/// </summary>
public interface IPurchasesSearchModel
{
    /// <summary>
    /// Search parameters related to the order.
    /// </summary>
    IOrderSearchParameters Order { get; set; }

    /// <summary>
    /// Search parameters related to the order owner.
    /// </summary>
    IUserSearchParameters User { get; set; }
}