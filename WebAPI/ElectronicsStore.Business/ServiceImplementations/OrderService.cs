using AutoMapper;
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
    public async Task<int> CreateAsync(OrderDto dto)
    {
        var entity = _mapper.Map<Order>(dto);

        await _unitOfWork.Orders.AddAsync(entity);
        var result = await _unitOfWork.Commit();
        return result;
    }
}