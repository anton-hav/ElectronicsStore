using AutoMapper;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Models.Responses;
using ReadingList.WebAPI.Models.Requests;

namespace ElectronicsStore.WebAPI.MappingProfiles;

/// <summary>
/// Mapper profile for Category
/// </summary>
public class CategoryProfile : Profile
{
    /// <summary>
    /// Mapper profile constructor
    /// </summary>
    public CategoryProfile()
    {
        CreateMap<Category, CategoryDto>();
        CreateMap<CategoryDto, Category>();

        CreateMap<AddOrUpdateCategoryRequestModel, CategoryDto>();

        CreateMap<CategoryDto, CategoryResponseModel>();
    }
}