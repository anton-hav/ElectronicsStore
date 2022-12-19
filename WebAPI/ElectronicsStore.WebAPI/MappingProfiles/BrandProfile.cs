using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;

namespace ElectronicsStore.WebAPI.MappingProfiles;

public class BrandProfile : Profile
{
    public BrandProfile()
    {
        CreateMap<Brand, BrandDto>();
        CreateMap<BrandDto, Brand>();
    }
}