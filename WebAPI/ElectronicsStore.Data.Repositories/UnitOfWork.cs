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
    public IRepository<Category> Categories { get; }
    public IRepository<Order> Orders { get; }


    public UnitOfWork(ElectronicsStoreDbContext dbContext, 
        IRepository<User> users, 
        IRepository<Role> roles, 
        IRepository<RefreshToken> refreshToken, 
        IRepository<Brand> brands, 
        IRepository<Product> products, 
        IRepository<Item> items, 
        IRepository<Category> categories, 
        IRepository<Order> orders)
    {
        _dbContext = dbContext;
        Users = users;
        Roles = roles;
        RefreshToken = refreshToken;
        Brands = brands;
        Products = products;
        Items = items;
        Categories = categories;
        Orders = orders;
    }


    public async Task<int> Commit()
    {
        return await _dbContext.SaveChangesAsync();
    }
}