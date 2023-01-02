namespace ElectronicsStore.Core.Abstractions.SearchParameters;

/// <summary>
/// Represent a pagination parameters
/// </summary>
public interface IPaginationParameters
{
    /// <summary>
    ///     Search parameter that represents the page number.
    /// </summary>
    /// 
    int PageNumber { get; set; }

    /// <summary>
    ///     Search parameter that represents the number of goods on the page.
    /// </summary>
    int PageSize { get; set; }
}