using AutoMapper;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.Core;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for Order.
/// </summary>
public class OrderProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor.
    /// </summary>
    public OrderProfile()
    {
        CreateMap<Order, OrderDto>();
        CreateMap<OrderDto, Order>();

        CreateMap<AddOrderRequestModel, OrderDto>()
            .ForMember(dto => dto.Id,
                opt
                    => opt.MapFrom(model => Guid.NewGuid()))
            .ForMember(dto => dto.Status,
                opt
                    => opt.MapFrom(model => OrderStatus.Created));

        CreateMap<PatchOrderRequestModel, OrderDto>();

        CreateMap<OrderDto, GetOrderResponseModel>();

        
    }
}