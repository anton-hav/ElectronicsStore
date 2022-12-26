using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Models.Responses;
using ReadingList.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

public class CategoryProfile : Profile
{
    public CategoryProfile()
    {
        CreateMap<Category, CategoryDto>();
        CreateMap<CategoryDto, Category>();

        CreateMap<AddOrUpdateCategoryRequestModel, CategoryDto>();

        CreateMap<CategoryDto, CategoryResponseModel>();
    }
}