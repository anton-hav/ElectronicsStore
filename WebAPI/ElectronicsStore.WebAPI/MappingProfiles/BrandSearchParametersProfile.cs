using AutoMapper;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.Business.ServiceImplementations;
using ElectronicsStore.Business;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for BrandSearchParameters
/// </summary>
public class BrandSearchParametersProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public BrandSearchParametersProfile()
    {
        CreateMap<GetBrandsRequestModel, BrandSearchParameters>()
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