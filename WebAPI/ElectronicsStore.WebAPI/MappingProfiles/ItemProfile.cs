using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Models.Responses;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for Item
/// </summary>
public class ItemProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
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