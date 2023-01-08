using AutoMapper;
using ElectronicsStore.Core.Abstractions.SearchModels;
using ElectronicsStore.Core.Abstractions.SearchParameters;
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
            throw new ArgumentException("Failed to find record in the database that match the specified id. ",
                nameof(id));
        var dto = _mapper.Map<PurchaseDto>(entity);
        return dto;
    }

    /// <inheritdoc />
    public async Task<IEnumerable<PurchaseDto>> GetPurchasesBySearchParametersAsync(IPurchasesSearchModel model)
    {
        var entities = _unitOfWork.Purchases.Get();

        entities = GetQueryWithOrderFilter(entities, model.Order);
        entities = GetQueryWithUserFilter(entities, model.User);


        var result = (await entities.AsNoTracking().ToListAsync())
            .Select(entity => _mapper.Map<PurchaseDto>(entity))
            .ToArray();

        return result;
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

    /// <summary>
    ///     Get query with order filters specified order search parameters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="order">order search parameters as a <see cref="IOrderSearchParameters" /></param>
    /// <returns>a query that includes order filter.</returns>
    private IQueryable<Purchase> GetQueryWithOrderFilter(IQueryable<Purchase> query, IOrderSearchParameters order)
    {
        if (order.OrderId != null && !order.OrderId.Equals(default))
            query = query.Where(entity => entity.OrderId.Equals(order.OrderId));

        return query;
    }

    /// <summary>
    /// Get query with user filters specified user search parameters.
    /// </summary>
    /// <param name="query">query</param>
    /// <param name="user">user search parameters as a <see cref="IUserSearchParameters"/></param>
    /// <returns>a query that includes user filter.</returns>
    private IQueryable<Purchase> GetQueryWithUserFilter(IQueryable<Purchase> query, IUserSearchParameters user)
    {
        if (user.UserId != null && !user.UserId.Equals(default))
            query = query.Where(entity => entity.Order.UserId.Equals(user.UserId));

        return query;
    }
}