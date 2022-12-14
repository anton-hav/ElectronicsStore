using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.DataBase;

public class ElectronicsStoreDbContext : DbContext
{
    protected override void OnModelCreating(ModelBuilder builder)
    {
    }

    public ElectronicsStoreDbContext(DbContextOptions<ElectronicsStoreDbContext> options)
        : base(options)
    {
    }
}