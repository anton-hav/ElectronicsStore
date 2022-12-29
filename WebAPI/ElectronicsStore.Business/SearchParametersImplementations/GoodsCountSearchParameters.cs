using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
///     Class contains search parameters for retrieve count of items from the storage.
/// </summary>
public class GoodsCountSearchParameters : IGoodsCountSearchParameters
{
    /// <summary>
    ///     Category parameters.
    /// </summary>
    public ICategorySearchParameters Category { get; set; }
}