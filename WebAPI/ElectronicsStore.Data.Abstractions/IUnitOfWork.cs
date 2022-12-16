using ElectronicsStore.Data.Abstractions.Repositories;
using ElectronicsStore.DataBase.Entities;

namespace ElectronicsStore.Data.Abstractions;

public interface IUnitOfWork
{
    IRepository<User> Users { get; }
    IRepository<Role> Roles { get; }
    IRepository<RefreshToken> RefreshToken { get; }
    Task<int> Commit();
}