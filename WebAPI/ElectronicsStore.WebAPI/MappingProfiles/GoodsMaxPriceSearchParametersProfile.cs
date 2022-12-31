using AutoMapper;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.Business;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for GoodsMaxPriceSearchParameters
/// </summary>
public class GoodsMaxPriceSearchParametersProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public GoodsMaxPriceSearchParametersProfile()
    {
        CreateMap<GetMaxGoodsPriceRequestModel, GoodsMaxPriceSearchParameters>()
            .ForMember(searchParams => searchParams.Category,
                opt
                    => opt.MapFrom(request => new CategorySearchParameters
                    {
                        CategoryId = request.CategoryId
                    }));
    }
}