using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Core.Abstractions.SearchModels;

/// <summary>
/// Model for searching orders in the storage.
/// </summary>
public interface IOrdersSearchModel
{
    /// <summary>
    /// Search parameters related to the order owner.
    /// </summary>
    IUserSearchParameters User { get; set; }
}