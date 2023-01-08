using ElectronicsStore.Core.Abstractions.SearchParameters;

namespace ElectronicsStore.Business.SearchParametersImplementations;

/// <summary>
/// Provide a user filter for searching.
/// </summary>
public class UserSearchParameters : IUserSearchParameters
{
    /// <inheritdoc />
    public Guid? UserId { get; set; }
}