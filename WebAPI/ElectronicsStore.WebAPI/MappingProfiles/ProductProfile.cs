using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;

namespace ElectronicsStore.WebAPI.MappingProfiles;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<ProductDto, Product>();
    }
}