using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for User
/// </summary>
public class UserProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public UserProfile()
    {
        CreateMap<User, UserDto>();

        CreateMap<UserDto, User>()
            .ForMember(ent => ent.Id,
                opt
                    => opt.MapFrom(dto => Guid.NewGuid()));

        CreateMap<RegisterUserRequestModel, UserDto>();
    }
}