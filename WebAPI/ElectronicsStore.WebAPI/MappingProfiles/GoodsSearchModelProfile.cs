using AutoMapper;
using ElectronicsStore.Business.SearchModelImplementations;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
///     Mapper profile for GoodsSearchModel
/// </summary>
public class GoodsSearchModelProfile : Profile
{
    /// <summary>
    ///     Mapper profile constructor
    /// </summary>
    public GoodsSearchModelProfile()
    {
        CreateMap<GetGoodsRequestModel, GoodsSearchModel>()
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
                    }))
            .ForMember(searchParams => searchParams.Price,
                opt
                    => opt.MapFrom(request => new PriceSearchParameters
                    {
                        From = request.From,
                        To = request.To
                    }));
    }
}