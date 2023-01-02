namespace ElectronicsStore.Core.Abstractions.Services;

public interface IRoleService
{
    //READ
    Task<Guid> GetRoleIdForDefaultRoleAsync();
    Task<Guid> GetRoleIdForAdminRoleAsync();
    string GetDefaultRoleNameForUser();
    string GetDefaultRoleNameForAdmin();

    //CREATE

    //UPDATE

    //REMOVE
}