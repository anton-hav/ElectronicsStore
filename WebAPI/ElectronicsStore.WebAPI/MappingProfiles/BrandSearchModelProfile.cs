using AutoMapper;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.Business.SearchModelImplementations;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for BrandSearchModel
/// </summary>
public class BrandSearchModelProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public BrandSearchModelProfile()
    {
        CreateMap<GetBrandsRequestModel, BrandSearchModel>()
            .ForMember(searchParams => searchParams.Category,
                opt
                    => opt.MapFrom(request => new CategorySearchParameters
                    {
                        CategoryId = request.CategoryId
                    }))
            .ForMember(searchParams => searchParams.Price,
                opt
                    => opt.MapFrom(request => new PriceSearchParameters()
                    {
                        From = request.From,
                        To = request.To,
                    }));
    }
}