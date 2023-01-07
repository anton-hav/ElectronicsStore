using AutoMapper;
using ElectronicsStore.Business.SearchModelImplementations;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
///     Mapper profile for PurchasesSearchModelProfile
/// </summary>
public class PurchasesSearchModelProfile : Profile
{
    /// <summary>
    ///     Mapper profile constructor
    /// </summary>
    public PurchasesSearchModelProfile()
    {
        CreateMap<GetPurchasesRequestModel, PurchasesSearchModel>()
            .ForMember(searchParams => searchParams.Order,
                opt
                    => opt.MapFrom(request => new OrderSearchParameters()
                    {
                        OrderId = request.OrderId,
                    }))
            .ForMember(searchParams => searchParams.User,
                opt
                    => opt.MapFrom(request => new UserSearchParameters()
                    {
                        UserId = null,
                    }));
    }
}