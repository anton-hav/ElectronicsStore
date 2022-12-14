namespace ElectronicsStore.Core.Abstractions;

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