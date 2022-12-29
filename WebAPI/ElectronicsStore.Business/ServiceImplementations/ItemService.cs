using AutoMapper;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.Data.Abstractions;
using ElectronicsStore.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.Business.ServiceImplementations;

public class ItemService : IItemService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICategoryService _categoryService;

    public ItemService(IMapper mapper,
        IUnitOfWork unitOfWork, 
        ICategoryService categoryService)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _categoryService = categoryService;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<ItemDto> GetItemWithPropertiesByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Items
            .Get()
            .Include(item => item.Product)
            .ThenInclude(product => product.Brand)
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id.Equals(id));

        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ",
                nameof(id));

        var dto = _mapper.Map<ItemDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<ItemDto>> GetAllItemsWithPropertiesAsync()
    {
        var goods = await _unitOfWork.Items
            .Get()
            .Include(item => item.Product)
            .ThenInclude(product => product.Brand)
            .AsNoTracking()
            .Select(entity => _mapper.Map<ItemDto>(entity))
            .ToArrayAsync();

        return goods;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<ItemDto>> GetItemsBySearchParametersAsync(IGoodsSearchParameters parameters)
    {
        var entities = _unitOfWork.Items.Get();

        //// Category filter
        //if (parameters.Category.CategoryId != null)
        //{
        //    var categoryId = (Guid)parameters.Category.CategoryId;
        //    var isRoot = await _categoryService.IsCategoryRootByIdAsync(categoryId);
        //    if (!isRoot)
        //    {
        //        var innerCategoryIds = await _categoryService.GetInnerCategoriesByCurrentCategoryIdAsync(categoryId);
        //        entities = entities.Where(entity => innerCategoryIds.Any(id => entity.CategoryId.Equals(id)));
        //    }
        //}
        entities = await GetQueryWithCategoryFilter(entities, parameters.Category);

        var result = (await entities
                .Skip(parameters.Pagination.PageSize * (parameters.Pagination.PageNumber - 1))
                .Take(parameters.Pagination.PageSize)
                .Include(item => item.Product)
                .ThenInclude(product => product.Brand)
                .AsNoTracking()
                .ToListAsync())
            .Select(entity => _mapper.Map<ItemDto>(entity))
            .ToArray();

        return result;
    }

    /// <inheritdoc />
    public async Task<int> GetItemsCountBySearchParametersAsync(IGoodsCountSearchParameters parameters)
    {
        var entities = _unitOfWork.Items.Get();

        entities = await GetQueryWithCategoryFilter(entities, parameters.Category);

        var result = await entities.AsNoTracking().CountAsync();
        return result;
    }

    ///// <inheritdoc />
    //public async Task<int> GetItemsCountBySearchParametersAsync()
    //{
    //    var entities = _unitOfWork.Items.Get();

    //    var result = await entities.AsNoTracking().CountAsync();
    //    return result;
    //}

    /// <summary>
    /// Get query with category filters specified category search parameters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="category">category search parameters as a <see cref="ICategorySearchParameters"/></param>
    /// <returns>a query that includes category filters.</returns>
    private async Task<IQueryable<Item>> GetQueryWithCategoryFilter(IQueryable<Item> query,
        ICategorySearchParameters category)
    {
        if (category.CategoryId != null)
        {
            var categoryId = (Guid)category.CategoryId;
            var isRoot = await _categoryService.IsCategoryRootByIdAsync(categoryId);
            if (!isRoot)
            {
                var innerCategoryIds = await _categoryService.GetInnerCategoriesByCurrentCategoryIdAsync(categoryId);
                query = query.Where(entity => innerCategoryIds.Any(id => entity.CategoryId.Equals(id)));
            }
        }

        return query;
    }
}