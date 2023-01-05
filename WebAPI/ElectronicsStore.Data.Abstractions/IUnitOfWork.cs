using ElectronicsStore.Data.Abstractions.Repositories;
using ElectronicsStore.DataBase.Entities;

namespace ElectronicsStore.Data.Abstractions;

public interface IUnitOfWork
{
    IRepository<User> Users { get; }
    IRepository<Role> Roles { get; }
    IRepository<Brand> Brands { get; }
    IRepository<Product> Products { get; }
    IRepository<Item> Items { get; }
    IRepository<RefreshToken> RefreshToken { get; }
    IRepository<Category> Categories { get; }
    IRepository<Order> Orders { get; }
    Task<int> Commit();
}