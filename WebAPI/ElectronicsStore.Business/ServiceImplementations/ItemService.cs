using AutoMapper;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.Data.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.Business.ServiceImplementations;

public class ItemService : IItemService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public ItemService(IMapper mapper,
        IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
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
    public async Task<IEnumerable<ItemDto>> GetItemsBySearchParametersAsync(int pageNumber, int pageSize)
    {
        var entities = _unitOfWork.Items.Get();

        var result = (await entities
                .Skip(pageSize * (pageNumber - 1))
                .Take(pageSize)
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