using AutoMapper;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.Data.Abstractions;
using ElectronicsStore.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.Business.ServiceImplementations;

public class CategoryService : ICategoryService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public CategoryService(IMapper mapper,
        IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<CategoryDto> GetByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Categories.GetByIdAsync(id);
        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ",
                nameof(id));
        var dto = _mapper.Map<CategoryDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    public async Task<List<CategoryDto>> GetCategoriesAsync()
    {
        var categories = await _unitOfWork.Categories
            .Get()
            .ToListAsync();

        return _mapper.Map<List<CategoryDto>>(categories);
    }

    /// <inheritdoc />
    public async Task<IEnumerable<CategoryDto>> GetCategoriesBySearchParametersAsync(Guid? parentId)
    {
        var entities = await _unitOfWork.Categories
            .Get()
            .AsNoTracking()
            .Where(entity => entity.ParentCategoryId.Equals(parentId))
            .Select(entity => _mapper.Map<CategoryDto>(entity))
            .ToArrayAsync();

        return entities;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<Guid>> GetInnerCategoriesByCurrentCategoryIdAsync(Guid categoryId)
    {
        var result = new List<Guid> { categoryId };

        var children = await _unitOfWork.Categories.Get()
            .AsNoTracking()
            .Where(entity => entity.ParentCategoryId.Equals(categoryId))
            .Select(entity => entity.Id)
            .ToListAsync();

        if (children.Any())
            foreach (var child in children)
                result.AddRange(await GetInnerCategoriesByCurrentCategoryIdAsync(child));
        return result;
    }

    /// <inheritdoc />
    public async Task<bool> IsCategoryExistByNameAndParentIdAsync(string name, Guid? parentId)
    {
        var entity = await _unitOfWork.Categories
            .Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.ParentCategoryId.Equals(parentId)
                                           && entity.Name.Equals(name));

        return entity != null;
    }

    /// <inheritdoc />
    public async Task<bool> IsCategoryExistByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Categories
            .Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.Id.Equals(id));

        return entity != null;
    }

    /// <inheritdoc />
    public async Task<bool> IsRootCategoryExistAsync()
    {
        var entity = await _unitOfWork.Categories
            .Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.ParentCategoryId.Equals(null));

        return entity != null;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<bool> IsCategoryRootByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Categories.GetByIdAsync(id);

        if (entity == null) throw new ArgumentException("The category specified by the identifier does not exist.");

        return entity.ParentCategoryId == null;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<int> CreateAsync(CategoryDto dto)
    {
        var entity = _mapper.Map<Category>(dto);

        if (entity == null)
            throw new ArgumentException("Mapping CategoryDto to Category was not possible.", nameof(dto));

        await _unitOfWork.Categories.AddAsync(entity);
        var result = await _unitOfWork.Commit();
        return result;
    }

    public async Task<int> UpdateAsync(CategoryDto dto)
    {
        throw new NotImplementedException();
    }

    public async Task<int> PatchAsync(Guid id, CategoryDto dto)
    {
        throw new NotImplementedException();
    }

    public async Task<int> DeleteAsync(Guid id)
    {
        throw new NotImplementedException();
    }
}