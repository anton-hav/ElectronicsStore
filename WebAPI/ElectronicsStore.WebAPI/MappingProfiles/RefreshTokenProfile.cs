using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;

namespace ElectronicsStore.WebAPI.MappingProfiles;

public class RefreshTokenProfile : Profile
{
    public RefreshTokenProfile()
    {
        CreateMap<RefreshToken, RefreshTokenDto>();
        CreateMap<RefreshTokenDto, RefreshToken>();
    }
}