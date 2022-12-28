﻿using AutoMapper;
using ElectronicsStore.Core;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.Data.Abstractions;
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

        // Category filter
        if (parameters.Category.CategoryId != null)
        {
            var categoryId = (Guid)parameters.Category.CategoryId;
            var isRoot = await _categoryService.IsCategoryRootByIdAsync(categoryId);
            if (!isRoot)
            {
                var innerCategoryIds = await _categoryService.GetInnerCategoriesByCurrentCategoryIdAsync(categoryId);
                entities = entities.Where(entity => innerCategoryIds.Any(id => entity.CategoryId.Equals(id)));
            }
        }

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
    public async Task<int> GetItemsCountBySearchParametersAsync()
    {
        var entities = _unitOfWork.Items.Get();

        var result = await entities.AsNoTracking().CountAsync();
        return result;
    }
}