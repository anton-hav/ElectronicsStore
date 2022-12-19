using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Models.Responses;

namespace ElectronicsStore.WebAPI.MappingProfiles;

public class ItemProfile : Profile
{
    public ItemProfile()
    {
        CreateMap<Item, ItemDto>();
        CreateMap<ItemDto, Item>();

        CreateMap<ItemDto, GetItemResponseModel>()
            .ForMember(model => model.Name,
                opt
                    => opt.MapFrom(dto => dto.Product.Name))
            .ForMember(model => model.Brand,
                opt
                    => opt.MapFrom(dto => dto.Product.Brand.Name));
    }
}