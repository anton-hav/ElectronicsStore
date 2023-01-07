using AutoMapper;
using ElectronicsStore.Core;
using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.Abstractions.SearchParameters;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.Data.Abstractions;
using ElectronicsStore.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.Business.ServiceImplementations;

public class OrderService : IOrderService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IMapper mapper, 
        IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<OrderDto> GetByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Orders.GetByIdAsync(id);

        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ", nameof(id));
        var dto = _mapper.Map<OrderDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<OrderDto>> GetOrdersBySearchParametersAsync(IOrdersSearchModel model)
    {
        var entities = _unitOfWork.Orders.Get();

        entities = GetQueryWithUserFilter(entities, model.User);

        var result = (await entities.AsNoTracking().ToListAsync())
            .Select(entity => _mapper.Map<OrderDto>(entity))
            .ToArray();

        return result;
    }

    /// <inheritdoc />
    public async Task<bool> IsOrderExistByCreationDateAndUserIdAsync(DateTime orderCreationDate, Guid userId)
    {
        var entity = await _unitOfWork.Orders
            .Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => (entity.DateTimeOfCreate.Equals(orderCreationDate))
                                           && entity.UserId.Equals(userId));

        return entity != null;
    }

    /// <inheritdoc />
    public async Task<bool> IsOrderExistByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Orders
            .Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.Id.Equals(id));

        return entity != null;
    }

    /// <inheritdoc />
    public async Task<int> CreateAsync(OrderDto dto)
    {
        var entity = _mapper.Map<Order>(dto);

        await _unitOfWork.Orders.AddAsync(entity);
        var result = await _unitOfWork.Commit();
        return result;
    }

    /// <inheritdoc />
    public async Task<int> PatchAsync(Guid id, OrderDto dto)
    {
        var sourceDto = await GetByIdAsync(id);

        var patchList = new List<PatchModel>();

        if (!dto.UserId.Equals(sourceDto.UserId))
            patchList.Add(new PatchModel
            {
                PropertyName = nameof(dto.UserId),
                PropertyValue = dto.UserId
            });

        if (!dto.Status.Equals(sourceDto.Status)
            && Enum.IsDefined(typeof(OrderStatus), dto.Status))
            patchList.Add(new PatchModel
            {
                PropertyName = nameof(dto.Status),
                PropertyValue = dto.Status
            });

        if (!dto.DateTimeOfCreate.Equals(sourceDto.DateTimeOfCreate))
            patchList.Add(new PatchModel
            {
                PropertyName = nameof(dto.DateTimeOfCreate),
                PropertyValue = dto.DateTimeOfCreate
            });

        await _unitOfWork.Orders.PatchAsync(id, patchList);
        return await _unitOfWork.Commit();
    }

    /// <summary>
    /// Get query with user filters specified user search parameters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="user">user search parameters as a <see cref="IUserSearchParameters"/></param>
    /// <returns>a query that includes user filter.</returns>
    private IQueryable<Order> GetQueryWithUserFilter(IQueryable<Order> query, IUserSearchParameters user)
    {
        if (user.UserId != null && !user.UserId.Equals(default))
            query = query.Where(entity => entity.UserId.Equals(user.UserId));

        return query;
    }
}