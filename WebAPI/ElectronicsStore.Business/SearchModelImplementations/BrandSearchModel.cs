using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchModelImplementations;

/// <summary>
///     Class contains search model for retrieve brands from the storage.
/// </summary>
public class BrandSearchModel : IBrandSearchModel
{
    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }

    /// <inheritdoc />
    public IPriceSearchParameters Price { get; set; }
}