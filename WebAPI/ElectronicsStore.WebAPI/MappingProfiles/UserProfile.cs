using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

public class UserProfile : Profile
{
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