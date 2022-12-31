using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
///     Class contains search parameters for retrieve brands from the storage.
/// </summary>
public class BrandSearchParameters : IBrandSearchParameters
{
    /// <inheritdoc />
    public ICategorySearchParameters Category { get; set; }

    /// <inheritdoc />
    public IPriceSearchParameters Price { get; set; }
}