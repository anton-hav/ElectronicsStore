using AutoMapper;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.Data.Abstractions;
using ElectronicsStore.DataBase.Entities;
using Microsoft.EntityFrameworkCore;

namespace ElectronicsStore.Business.ServiceImplementations;

public class PurchaseService : IPurchaseService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public PurchaseService(IMapper mapper, 
        IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    /// <inheritdoc />
    /// <exception cref="ArgumentException"></exception>
    public async Task<PurchaseDto> GetByIdAsync(Guid id)
    {
        var entity = await _unitOfWork.Purchases.GetByIdAsync(id);

        if (entity == null)
            throw new ArgumentException("Failed to find record in the database that match the specified id. ", nameof(id));
        var dto = _mapper.Map<PurchaseDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    public async Task<bool> IsPurchaseExistByOrderIdAndItemIdAsync(Guid orderId, Guid itemId)
    {
        var entity = await _unitOfWork.Purchases
            .Get()
            .AsNoTracking()
            .FirstOrDefaultAsync(entity => entity.OrderId.Equals(orderId) 
                                           && entity.OrderId.Equals(itemId));

        return entity != null;
    }

    /// <inheritdoc />
    public async Task<int> CreateAsync(PurchaseDto dto)
    {
        var entity = _mapper.Map<Purchase>(dto);

        await _unitOfWork.Purchases.AddAsync(entity);
        var result = await _unitOfWork.Commit();
        return result;
    }
}