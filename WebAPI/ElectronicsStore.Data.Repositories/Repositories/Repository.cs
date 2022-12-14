using System.Linq.Expressions;
using ElectronicsStore.Core;
using ElectronicsStore.Data.Abstractions.Repositories;
using ElectronicsStore.DataBase;
using ElectronicsStore.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.Data.Repositories.Repositories;

/// <summary>
///     Repository
/// </summary>
/// <typeparam name="T">object that implements <see cref="IBaseEntity" /></typeparam>
public class Repository<T> : IRepository<T>
    where T : class, IBaseEntity
{
    protected readonly ElectronicsStoreDbContext DbContext;
    protected readonly DbSet<T> DbSet;

    public Repository(ElectronicsStoreDbContext dbContext)
    {
        DbContext = dbContext;
        DbSet = dbContext.Set<T>();
    }

    /// <summary>
    ///     Gets an entity by a unique identifier
    /// </summary>
    /// <param name="id">a unique identifier as a <see cref="Guid" /></param>
    /// <returns>an entity</returns>
    public virtual async Task<T?> GetByIdAsync(Guid id)
    {
        return await DbSet
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.Id.Equals(id));
    }

    /// <summary>
    ///     Gets IQueryable object
    /// </summary>
    /// <returns><see cref="IQueryable{T}" /> where T is an entity</returns>
    public IQueryable<T> Get()
    {
        return DbSet;
    }

    /// <summary>
    ///     Gets IQuearyable with includes inner properties.
    /// </summary>
    /// <param name="searchExpression">a search expression</param>
    /// <param name="includes">an include expressions</param>
    /// <returns><see cref="IQueryable{T}" /> where T is an entity</returns>
    public virtual IQueryable<T> FindBy(Expression<Func<T, bool>> searchExpression,
        params Expression<Func<T, object>>[] includes)
    {
        var result = DbSet.Where(searchExpression);
        if (includes.Any())
            result = includes.Aggregate(result, (current, include) =>
                current.Include(include));

        return result;
    }

    /// <summary>
    ///     Adds the entity to the DbContext.
    /// </summary>
    /// <param name="entity">an entity</param>
    /// <returns>The Task</returns>
    public virtual async Task AddAsync(T entity)
    {
        await DbSet.AddAsync(entity);
    }

    /// <summary>
    ///     Adds the range of entity to the DbContext.
    /// </summary>
    /// <param name="entities">a range of entities as <see cref="IEnumerable{T}" /></param>
    /// <returns>The Task</returns>
    public virtual async Task AddRangeAsync(IEnumerable<T> entities)
    {
        await DbSet.AddRangeAsync(entities);
    }

    /// <summary>
    ///     Update an entity
    /// </summary>
    /// <param name="entity">an entity</param>
    public virtual void Update(T entity)
    {
        DbSet.Update(entity);
    }

    /// <summary>
    ///     Patch an entity
    /// </summary>
    /// <param name="id">a unique identifier as a <see cref="Guid" /></param>
    /// <param name="patchData">list of <see cref="PatchModel" /></param>
    /// <returns>The Task</returns>
    public async Task PatchAsync(Guid id, List<PatchModel> patchData)
    {
        var model = await DbSet
            .FirstOrDefaultAsync(entity => entity.Id.Equals(id));

        var nameValuePropertiesPairs = patchData
            .ToDictionary(
                patchModel => patchModel.PropertyName,
                patchModel => patchModel.PropertyValue);

        var dbEntityEntry = DbContext.Entry(model);
        dbEntityEntry.CurrentValues.SetValues(nameValuePropertiesPairs);

        dbEntityEntry.State = EntityState.Modified;
    }

    /// <summary>
    ///     Remove
    /// </summary>
    /// <param name="entity"></param>
    public virtual void Remove(T entity)
    {
        DbSet.Remove(entity);
    }
}