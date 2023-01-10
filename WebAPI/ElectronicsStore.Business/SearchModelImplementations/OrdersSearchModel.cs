using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchModelImplementations;

/// <summary>
///     Class contains search model for retrieve orders from the storage.
/// </summary>
public class OrdersSearchModel : IOrdersSearchModel
{
    /// <inheritdoc />
    public IUserSearchParameters User { get; set; }
}