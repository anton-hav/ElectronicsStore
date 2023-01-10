using System.ComponentModel;
using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
/// Represent a pagination model.
/// </summary>
public class PaginationParameters : IPaginationParameters
{
    /// <inheritdoc />
    public int PageNumber { get; set; }

    /// <inheritdoc />
    public int PageSize { get; set; }
}