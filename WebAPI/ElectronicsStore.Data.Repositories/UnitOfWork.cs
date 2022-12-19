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
    public IRepository<Brand> Brands { get; }
    public IRepository<Product> Products { get; }
    public IRepository<Item> Items { get; }
    public IRepository<RefreshToken> RefreshToken { get; }


    public UnitOfWork(ElectronicsStoreDbContext dbContext, 
        IRepository<User> users, 
        IRepository<Role> roles, 
        IRepository<RefreshToken> refreshToken, 
        IRepository<Brand> brands, 
        IRepository<Product> products, 
        IRepository<Item> items)
    {
        _dbContext = dbContext;
        Users = users;
        Roles = roles;
        RefreshToken = refreshToken;
        Brands = brands;
        Products = products;
        Items = items;
    }


    public async Task<int> Commit()
    {
        return await _dbContext.SaveChangesAsync();
    }
}