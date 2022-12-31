using AutoMapper;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.Data.Abstractions;
using ElectronicsStore.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.Business.ServiceImplementations;

public class BrandService : IBrandService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICategoryService _categoryService;

    public BrandService(IMapper mapper,
        IUnitOfWork unitOfWork,
        ICategoryService categoryService)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _categoryService = categoryService;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<BrandDto> GetByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Brands.GetByIdAsync(id);

        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ",
                nameof(id));

        var dto = _mapper.Map<BrandDto>(entity);
        return dto;
    }

    public async Task<IEnumerable<BrandDto>> GetBrandsBySearchParametersAsync(IBrandSearchParameters parameters)
    {
        var entities = _unitOfWork.Items.Get();

        entities = await GetQueryWithCategoryFilter(entities, parameters.Category);
        entities = GetQueryWithPriceFilter(entities, parameters.Price);

        var brands = (await entities
                .Include(entity => entity.Product)
                .ThenInclude(product => product.Brand)
                .AsNoTracking()
                .GroupBy(entity => entity.Product.BrandId)
                .Select(group => group.First())
                .ToListAsync())
            .Select(entity => _mapper.Map<BrandDto>(entity.Product.Brand)).OrderBy(brand => brand.Name).ToArray();

        return brands;
    }

    /// <summary>
    ///     Get query with category filters specified category search parameters.
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
    ///     Get query with price filters parameters.
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
}