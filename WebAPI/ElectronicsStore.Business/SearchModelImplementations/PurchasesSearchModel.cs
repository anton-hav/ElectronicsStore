using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchModelImplementations;

/// <summary>
///     Class contains search model for retrieve purchases from the storage.
/// </summary>
public class PurchasesSearchModel : IPurchasesSearchModel
{
    /// <inheritdoc />
    public IOrderSearchParameters Order { get; set; }

    /// <inheritdoc />
    public IUserSearchParameters User { get; set; }
}