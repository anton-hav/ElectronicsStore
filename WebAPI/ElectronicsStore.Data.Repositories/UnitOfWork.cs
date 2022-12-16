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
    public IRepository<RefreshToken> RefreshToken { get; }


    public UnitOfWork(ElectronicsStoreDbContext dbContext, 
        IRepository<User> users, 
        IRepository<Role> roles, 
        IRepository<RefreshToken> refreshToken)
    {
        _dbContext = dbContext;
        Users = users;
        Roles = roles;
        RefreshToken = refreshToken;
    }


    public async Task<int> Commit()
    {
        return await _dbContext.SaveChangesAsync();
    }
}