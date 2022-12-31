﻿using AutoMapper;
using ElectronicsStore.Business;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for GoodsCountSearchParameters
/// </summary>
public class GoodsCountSearchParametersProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public GoodsCountSearchParametersProfile()
    {
        CreateMap<GetGoodsCountRequestModel, GoodsCountSearchParameters>()
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