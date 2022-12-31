using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for RefreshToken
/// </summary>
public class RefreshTokenProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public RefreshTokenProfile()
    {
        CreateMap<RefreshToken, RefreshTokenDto>();
        CreateMap<RefreshTokenDto, RefreshToken>();
    }
}