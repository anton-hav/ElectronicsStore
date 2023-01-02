using AutoMapper;
using ElectronicsStore.Business.SearchModelImplementations;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
///     Mapper profile for GoodsMaxPriceSearchModel
/// </summary>
public class GoodsMaxPriceSearchModelProfile : Profile
{
    /// <summary>
    ///     Mapper profile constructor
    /// </summary>
    public GoodsMaxPriceSearchModelProfile()
    {
        CreateMap<GetMaxGoodsPriceRequestModel, GoodsMaxPriceSearchModel>()
            .ForMember(searchParams => searchParams.Category,
                opt
                    => opt.MapFrom(request => new CategorySearchParameters
                    {
                        CategoryId = request.CategoryId
                    }));
    }
}