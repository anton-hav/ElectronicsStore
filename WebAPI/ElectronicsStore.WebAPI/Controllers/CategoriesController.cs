using AutoMapper;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ReadingList.WebAPI.Models.Requests;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ICategoryService _categoryService;

    public CategoriesController(IMapper mapper,
        ICategoryService categoryService)
    {
        _mapper = mapper;
        _categoryService = categoryService;
    }

    /// <summary>
    ///     Get a category from storage with specified id.
    /// </summary>
    /// <param name="id">a category unique identifier as a <see cref="Guid" /></param>
    /// <returns>A category with specified Id</returns>
    /// <response code="200">Returns a category corresponding to the specified identifier.</response>
    /// <response code="404">Failed to find record in the database that match the specified id.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(CategoryResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCategoryById(Guid id)
    {
        try
        {
            var dto = await _categoryService.GetByIdAsync(id);
            var category = _mapper.Map<CategoryResponseModel>(dto);
            return Ok(category);
        }
        catch (ArgumentException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return NotFound(new ErrorModel { Message = ex.Message });
        }
        catch (Exception ex)
        {
            Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return StatusCode(500, new ErrorModel { Message = "Unexpected error on the server side." });
        }
    }

    /// <summary>
    ///     Get categories from storage.
    /// </summary>
    /// <param name="model">category request model</param>
    /// <returns>all categories</returns>
    /// <response code="200">Returns all categories.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<CategoryResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetCategories([FromQuery]GetCategoriesRequestModel model)
    {
        try
        {
            var categories = await _categoryService.GetCategoriesBySearchParametersAsync(model.ParentCategoryId);
            var response = _mapper.Map<IEnumerable<CategoryResponseModel>>(categories);

            return Ok(response);
        }
        catch (Exception ex)
        {
            Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return StatusCode(500, new ErrorModel { Message = "Unexpected error on the server side." });
        }
    }

    /// <summary>
    ///     Add a new category to storage.
    /// </summary>
    /// <param name="model">a category</param>
    /// <returns>A newly created category</returns>
    /// <response code="201">Returns the newly created category</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="409">The same entry already exists in the storage.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(CategoryResponseModel), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> AddCategory([FromBody] AddOrUpdateCategoryRequestModel model)
    {
        try
        {
            if (model.Name.IsNullOrEmpty())
                throw new ArgumentNullException(nameof(model), "One or more object properties are null.");

            var isExist = await _categoryService.IsCategoryExistByNameAndParentIdAsync(model.Name, model.ParentCategoryId);
            if (isExist)
                throw new ArgumentException("The same entry already exists in the storage.", nameof(model));

            if (model.ParentCategoryId == null)
            {
                var isRootCategoryExist = await _categoryService.IsRootCategoryExistAsync();
                if (isRootCategoryExist)
                    throw new ArgumentNullException(nameof(model),
                        "Root category already exist. The parent category identifier for the new entry must not be null.");
            }
            else
            {
                var isParentCategoryExist = await _categoryService.IsCategoryExistByIdAsync((Guid)model.ParentCategoryId);
                if (!isParentCategoryExist)
                    throw new ArgumentNullException(nameof(model),
                        "The record with the specified unique identifier of the parent category does not exist.");
            }

            var dto = _mapper.Map<CategoryDto>(model);
            dto.Id = Guid.NewGuid();
            var result = await _categoryService.CreateAsync(dto);

            var response = _mapper.Map<CategoryResponseModel>(dto);

            return CreatedAtAction(nameof(GetCategoryById), new { id = response.Id }, response);
        }
        catch (ArgumentNullException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return BadRequest(new ErrorModel { Message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return Conflict(new ErrorModel { Message = ex.Message });
        }
        catch (Exception ex)
        {
            Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return StatusCode(500, new ErrorModel { Message = "Unexpected error on the server side." });
        }
    }

    /// <summary>
    ///     Update or replace a category with specified Id in storage.
    /// </summary>
    /// <param name="id">a category unique identifier as a <see cref="Guid" /></param>
    /// <param name="model">a category used for update</param>
    /// <returns>A category with specified Id.</returns>
    /// <response code="200">Returns the updated category</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="409">
    ///     Fail to find a record with the specified Id in the storage
    ///     or the entry with the same property already exists in the storage.
    /// </response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(CategoryResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> UpdateCategory(Guid id, [FromBody] AddOrUpdateCategoryRequestModel model)
    {
        try
        {
            if (model.Name.IsNullOrEmpty())
                throw new ArgumentNullException(nameof(model), "One or more object properties are null.");

            var isValid = await CheckCategoryForEditAsync(id, model.Name, model.ParentCategoryId);

            var dto = _mapper.Map<CategoryDto>(model);
            dto.Id = id;
            var result = await _categoryService.UpdateAsync(dto);
            var response = _mapper.Map<CategoryResponseModel>(dto);

            return Ok(response);
        }
        catch (ArgumentNullException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return BadRequest(new ErrorModel { Message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return NotFound(new ErrorModel { Message = ex.Message });
        }
        catch (Exception ex)
        {
            Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return StatusCode(500);
        }
    }

    /// <summary>
    ///     Patch a category with specified Id in storage.
    /// </summary>
    /// <param name="id">a category unique identifier as a <see cref="Guid" /></param>
    /// <param name="model">a category used for patching</param>
    /// <returns>A category with specified Id.</returns>
    /// <response code="200">Returns the updated category</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="409">
    ///     Fail to find a record with the specified Id in the storage
    ///     or the entry with the same property already exists in the storage.
    /// </response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPatch("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(typeof(CategoryResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> PatchCategory(Guid id, [FromBody] AddOrUpdateCategoryRequestModel model)
    {
        try
        {
            if (model.Name.IsNullOrEmpty())
                throw new ArgumentNullException(nameof(model), "One or more object properties are null.");

            if (id.Equals(default))
                throw new ArgumentNullException(nameof(id), "A non-empty Id is required.");

            var isExistById = await _categoryService.IsCategoryExistByIdAsync(id);
            if (!isExistById)
                throw new ArgumentException("Fail to find a record with the specified Id in the storage",
                    nameof(id));

            var isExistByName = await _categoryService.IsCategoryExistByNameAndParentIdAsync(model.Name, model.ParentCategoryId);
            if (isExistByName)
                throw new ArgumentException("The same entry already exists in the storage.", nameof(model));

            var dto = _mapper.Map<CategoryDto>(model);
            dto.Id = id;
            var result = await _categoryService.PatchAsync(id, dto);
            var response = _mapper.Map<CategoryResponseModel>(dto);

            return Ok(response);
        }
        catch (ArgumentNullException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return BadRequest(new ErrorModel { Message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return NotFound(new ErrorModel { Message = ex.Message });
        }
        catch (Exception ex)
        {
            Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return StatusCode(500);
        }
    }

    /// <summary>
    ///     Delete a category with specified Id from the storage.
    /// </summary>
    /// <param name="id">a category unique identifier as a <see cref="Guid" /></param>
    /// <returns></returns>
    /// <response code="204">Successful deletion</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="409">
    ///     Fail to find a record with the specified Id in the storage
    ///     or the entry with the same property already exists in the storage.
    /// </response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteCategory(Guid id)
    {
        try
        {
            if (id.Equals(default))
                throw new ArgumentNullException(nameof(id), "A non-empty Id is required.");

            var isExistById = await _categoryService.IsCategoryExistByIdAsync(id);
            if (!isExistById)
                throw new ArgumentException("Fail to find a record with the specified Id in the storage",
                    nameof(id));

            var result = await _categoryService.DeleteAsync(id);

            return NoContent();
        }
        catch (ArgumentNullException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return BadRequest(new ErrorModel { Message = ex.Message });
        }
        catch (ArgumentException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return NotFound(new ErrorModel { Message = ex.Message });
        }
        catch (Exception ex)
        {
            Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return StatusCode(500);
        }
    }

    /// <summary>
    ///     Validate a category model for update.
    /// </summary>
    /// <param name="id">a unique identifier that defines the category to be updated </param>
    /// <param name="categoryName">a category name</param>
    /// <param name="parentId">an unique identifier of the parent category</param>
    /// <returns>A boolean</returns>
    /// <exception cref="ArgumentNullException">If the id is empty.</exception>
    /// <exception cref="ArgumentException">If the same entry already exists in the storage.</exception>
    private async Task<bool> CheckCategoryForEditAsync(Guid id, string categoryName, Guid? parentId)
    {
        var isExist = await _categoryService
            .IsCategoryExistByNameAndParentIdAsync(categoryName, parentId);

        if (isExist)
        {
            if (!id.Equals(default))
            {
                var isCategoryTheSame = await IsCategoryTheSameAsync(id, categoryName, parentId);

                if (isCategoryTheSame) return true;
            }
            else
            {
                throw new ArgumentNullException(nameof(id), "A non-empty Id is required.");
            }

            throw new ArgumentException("The same entry already exists in the storage.", nameof(categoryName));
            ;
        }

        return true;
    }

    /// <summary>
    ///     Check if the existing category is the same.
    /// </summary>
    /// <remarks>
    ///     This check is necessary to ensure idempotent behavior of the PUT method.
    /// </remarks>
    /// <param name="id">category unique identifier</param>
    /// <param name="categoryName">category name</param>
    /// <param name="parentId">an unique identifier of the parent category</param>
    /// <returns></returns>
    private async Task<bool> IsCategoryTheSameAsync(Guid id, string categoryName, Guid? parentId)
    {
        var dto = await _categoryService.GetByIdAsync(id);
        return dto.Name.Equals(categoryName)
               && ((dto.ParentCategoryId == null && parentId == null)
                   || dto.ParentCategoryId.Equals(parentId));
    }
}