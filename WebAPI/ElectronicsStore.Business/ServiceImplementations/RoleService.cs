using System.Text.Json;
using AutoMapper;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.Data.Abstractions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace ElectronicsStore.Business.ServiceImplementations;

public class RoleService : IRoleService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _configuration;

    public RoleService(IMapper mapper,
        IUnitOfWork unitOfWork,
        IConfiguration configuration)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _configuration = configuration;
    }

    /// <summary>
    ///     Gets the role Id for a default user role.
    /// </summary>
    /// <returns>The Task&lt;Result&gt; where Result is GUID</returns>
    /// <exception cref="ArgumentException"></exception>
    public async Task<Guid> GetRoleIdForDefaultRoleAsync()
    {
        var roleNameByDefault = GetDefaultRoleNameForUser();
        var role = await _unitOfWork.Roles
            .FindBy(r =>
                r.Name.Equals(roleNameByDefault))
            .AsNoTracking().FirstOrDefaultAsync();
        if (role == null)
            throw new ArgumentException(
                $"There is no entry in the database matching the default role value: {nameof(roleNameByDefault)}");

        return role.Id;
    }

    /// <summary>
    ///     Gets the role Id for an admin role.
    /// </summary>
    /// <returns>The Task&lt;Result&gt; where Result is GUID</returns>
    /// <exception cref="ArgumentException"></exception>
    public async Task<Guid> GetRoleIdForAdminRoleAsync()
    {
        var roleNameByDefault = GetDefaultRoleNameForAdmin();
        var role = await _unitOfWork.Roles
            .FindBy(r =>
                r.Name.Equals(roleNameByDefault))
            .AsNoTracking().FirstOrDefaultAsync();
        if (role == null)
            throw new ArgumentException(
                $"There is no entry in the database matching the admin role value: {nameof(roleNameByDefault)}");

        return role.Id;
    }

    /// <summary>
    ///     Gets the role name for a default user role.
    /// </summary>
    /// <returns>The role name as a string</returns>
    /// <exception cref="JsonException"></exception>
    public string GetDefaultRoleNameForUser()
    {
        var roleName = _configuration["RoleByDefault"];
        if (roleName == null)
            throw new JsonException(
                "Failed to retrieve a valid default role value.");

        return roleName;
    }

    /// <summary>
    ///     Gets the role name for a default admin role.
    /// </summary>
    /// <returns>The role name as a string</returns>
    /// <exception cref="JsonException"></exception>
    public string GetDefaultRoleNameForAdmin()
    {
        var roleName = _configuration["RoleNameForAdmin"];
        if (roleName == null)
            throw new JsonException(
                "Failed to retrieve a valid default role value for admin.");

        return roleName;
    }
}