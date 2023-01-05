using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for Purchase
/// </summary>
public class PurchaseProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public PurchaseProfile()
    {
        CreateMap<Purchase, PurchaseDto>();
        CreateMap<PurchaseDto, Purchase>();

        CreateMap<AddPurchaseRequestModel, PurchaseDto>()
            .ForMember(dto => dto.Id,
                opt
                    => opt.MapFrom(model => Guid.NewGuid()));

        CreateMap<PurchaseDto, GetPurchaseResponseModel>();
    }
}