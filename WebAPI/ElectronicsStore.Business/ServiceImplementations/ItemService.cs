using AutoMapper;
using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.Abstractions.SearchParameters;
using ElectronicsStore.Core.Abstractions.Services;
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
    public async Task<IEnumerable<ItemDto>> GetItemsBySearchParametersAsync(IGoodsSearchModel model)
    {
        var entities = _unitOfWork.Items.Get();

        entities = await GetQueryWithCategoryFilter(entities, model.Category);
        entities = GetQueryWithPriceFilter(entities, model.Price);
        entities = GetQueryWithBrandsFilter(entities, model.Brands);
        entities = GetQueryWithSearchFilter(entities, model.Searches);

        var result = (await entities
                .Skip(model.Pagination.PageSize * (model.Pagination.PageNumber - 1))
                .Take(model.Pagination.PageSize)
                .Include(item => item.Product)
                .ThenInclude(product => product.Brand)
                .AsNoTracking()
                .ToListAsync())
            .Select(entity => _mapper.Map<ItemDto>(entity))
            .ToArray();

        return result;
    }

    /// <inheritdoc />
    public async Task<int> GetItemsCountBySearchParametersAsync(IGoodsCountSearchModel model)
    {
        var entities = _unitOfWork.Items.Get();

        entities = await GetQueryWithCategoryFilter(entities, model.Category);
        entities = GetQueryWithPriceFilter(entities, model.Price);
        entities = GetQueryWithBrandsFilter(entities, model.Brands);
        entities = GetQueryWithSearchFilter(entities, model.Searches);

        var result = await entities.AsNoTracking().CountAsync();
        return result;
    }

    /// <inheritdoc />
    public async Task<double> GetMaxItemsPriceBySearchParametersAsync(IGoodsMaxPriceSearchModel model)
    {
        var entities = _unitOfWork.Items.Get();

        entities = await GetQueryWithCategoryFilter(entities, model.Category);

        var entity = await entities.AsNoTracking().OrderByDescending(entity => entity.Cost).FirstOrDefaultAsync();
        if (entity == null)
            throw new ArgumentException("No records matching the search conditions were found");

        return entity.Cost;
    }

    /// <summary>
    ///     Get query with category filters specified category search model.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="category">category search parameters as a <see cref="ICategorySearchParameters" /></param>
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

    /// <summary>
    ///     Get query with price filters model.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="price">price search parameters as a <see cref="IPriceSearchParameters" /></param>
    /// <returns>a query that includes price filters.</returns>
    private IQueryable<Item> GetQueryWithPriceFilter(IQueryable<Item> query, IPriceSearchParameters price)
    {
        if (price.From != null && price.From != 0) query = query.Where(entity => entity.Cost >= price.From);

        if (price.To != null && price.To != 0) query = query.Where(entity => entity.Cost <= price.To);

        return query;
    }

    /// <summary>
    ///     Get query with brand filters model.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="brands">brand search parameters as a <see cref="IBrandSearchParameters" /></param>
    /// <returns>a query that includes brand filters.</returns>
    private IQueryable<Item> GetQueryWithBrandsFilter(IQueryable<Item> query, IBrandSearchParameters brands)
    {
        if (brands.BrandNames != null && brands.BrandNames.Any())
            query = query
                .Where(entity => brands.BrandNames
                    .Any(brand => brand.Equals(entity.Product.Brand.Name)));

        return query;
    }

    /// <summary>
    /// Get query with custom search filters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="searches">custom search parameters as a <see cref="ISearchesSearchParameters"/></param>
    /// <returns>a query that includes custom filters.</returns>
    private IQueryable<Item> GetQueryWithSearchFilter(IQueryable<Item> query, ISearchesSearchParameters searches)
    {
        if (searches.Searches != null && searches.Searches.Any())
            foreach (var search in searches.Searches)
            {
                var pureSearch = search.Trim().ToLower();
                query = query.Where(entity
                    => entity.Product.Name.ToLower().Contains(pureSearch)
                       || entity.Summary.ToLower().Contains(pureSearch)
                       || entity.Description.ToLower().Contains(pureSearch));
            }

        return query;
    }
}