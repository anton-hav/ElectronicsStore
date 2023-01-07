using AutoMapper;
using ElectronicsStore.Business.SearchModelImplementations;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
///     Mapper profile for OrdersSearchModel
/// </summary>
public class OrdersSearchModelProfile : Profile
{
    /// <summary>
    ///     Mapper profile constructor
    /// </summary>
    public OrdersSearchModelProfile()
    {
        CreateMap<GetOrdersRequestModel, OrdersSearchModel>()
            .ForMember(searchParams => searchParams.User,
                opt
                    => opt.MapFrom(request => new UserSearchParameters()
                    {
                        UserId = null,
                    }));
    }
}