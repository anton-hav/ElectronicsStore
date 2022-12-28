using System.ComponentModel;
using ElectronicsStore.Core.Abstractions;

namespace ElectronicsStore.Business;

/// <summary>
/// Represent a pagination parameters.
/// </summary>
public class PaginationParameters : IPaginationParameters
{
    /// <inheritdoc />
    public int PageNumber { get; set; }

    /// <inheritdoc />
    public int PageSize { get; set; }
}