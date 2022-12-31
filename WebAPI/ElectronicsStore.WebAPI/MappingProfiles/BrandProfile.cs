using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Models.Responses;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for Brand
/// </summary>
public class BrandProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public BrandProfile()
    {
        CreateMap<Brand, BrandDto>();
        CreateMap<BrandDto, Brand>();

        CreateMap<BrandDto, GetBrandResponseModel>()
            .ForMember(model => model.Id,
                opt
                    => opt.MapFrom(dto => dto.Id))
            .ForMember(model => model.Name,
                opt
                    => opt.MapFrom(dto => dto.Name));
    }
}