using AutoMapper;
using ElectronicsStore.Business.SearchModelImplementations;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
///     Mapper profile for GoodsCountSearchModel
/// </summary>
public class GoodsCountSearchModelProfile : Profile
{
    /// <summary>
    ///     Mapper profile constructor
    /// </summary>
    public GoodsCountSearchModelProfile()
    {
        CreateMap<GetGoodsCountRequestModel, GoodsCountSearchModel>()
            .ForMember(searchParams => searchParams.Category,
                opt
                    => opt.MapFrom(request => new CategorySearchParameters
                    {
                        CategoryId = request.CategoryId
                    }))
            .ForMember(searchParams => searchParams.Price,
                opt
                    => opt.MapFrom(request => new PriceSearchParameters
                    {
                        From = request.From,
                        To = request.To
                    }))
            .ForMember(searchParams => searchParams.Brands,
                opt
                    => opt.MapFrom(request => new BrandSearchParameters
                    {
                        BrandNames = request.Brands
                    }));
    }
}