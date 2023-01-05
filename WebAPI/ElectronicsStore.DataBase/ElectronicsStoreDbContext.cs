using ElectronicsStore.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.DataBase;

public class ElectronicsStoreDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Brand> Brands { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Item> Items { get; set; }
    public DbSet<RefreshToken> RefreshTokens { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Purchase> Purchases { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<User>()
            .HasIndex(user => user.Email)
            .IsUnique();

        builder.Entity<Role>()
            .HasIndex(role => role.Name)
            .IsUnique();

        builder.Entity<Brand>()
            .HasIndex(brand => brand.Name)
            .IsUnique();

        builder.Entity<Product>()
            .HasIndex(product => new
            {
                product.BrandId,
                product.Name,
            })
            .IsUnique();

        builder.Entity<Category>()
            .HasIndex(category => new
            {
                category.Name,
                category.ParentCategoryId,
            })
            .IsUnique();

        builder.Entity<Order>()
            .HasIndex(order => new
            {
                order.UserId,
                order.DateTimeOfCreate,
            })
            .IsUnique();

        builder.Entity<Purchase>()
            .HasIndex(purchase => new
            {
                purchase.ItemId,
                purchase.OrderId,
            })
            .IsUnique();
    }

    public ElectronicsStoreDbContext(DbContextOptions<ElectronicsStoreDbContext> options)
        : base(options)
    {
    }
}