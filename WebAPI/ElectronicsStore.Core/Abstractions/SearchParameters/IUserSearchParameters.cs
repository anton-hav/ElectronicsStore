namespace ElectronicsStore.Core.Abstractions.SearchParameters;

/// <summary>
/// Represent a user filter parameters.
/// </summary>
public interface IUserSearchParameters
{
    /// <summary>
    /// Filter parameters that represents user id.
    /// </summary>
    Guid? UserId { get; set; }
}