using AutoMapper;
using ElectronicsStore.Business;
using ElectronicsStore.Business.ServiceImplementations;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for GoodsSearchParameters
/// </summary>
public class GoodsSearchParametersProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public GoodsSearchParametersProfile()
    {
        CreateMap<GetGoodsRequestModel, GoodsSearchParameters>()
            .ForMember(searchParams => searchParams.Pagination,
                opt
                    => opt.MapFrom(request => new PaginationParameters
                    {
                        PageNumber = request.PageNumber,
                        PageSize = request.PageSize
                    }))
            .ForMember(searchParams => searchParams.Category,
                opt
                    => opt.MapFrom(request => new CategorySearchParameters
                    {
                        CategoryId = request.CategoryId
                    }));
    }
}