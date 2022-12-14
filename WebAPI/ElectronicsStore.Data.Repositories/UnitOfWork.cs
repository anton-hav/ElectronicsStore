using ElectronicsStore.Data.Abstractions;
using ElectronicsStore.Data.Abstractions.Repositories;
using ElectronicsStore.DataBase;
using ElectronicsStore.DataBase.Entities;

namespace ElectronicsStore.Data.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly ElectronicsStoreDbContext _dbContext;
    public IRepository<User> Users { get; }
    public IRepository<Role> Roles { get; }


    public UnitOfWork(ElectronicsStoreDbContext dbContext, 
        IRepository<User> users, 
        IRepository<Role> roles)
    {
        _dbContext = dbContext;
        Users = users;
        Roles = roles;
    }


    public async Task<int> Commit()
    {
        return await _dbContext.SaveChangesAsync();
    }
}