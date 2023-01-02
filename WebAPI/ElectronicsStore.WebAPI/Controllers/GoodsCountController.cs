using AutoMapper;
using ElectronicsStore.Business.SearchModelImplementations;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers;

/// <summary>
/// Controller that provides API endpoints for the GoodsCount resource.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class GoodsCountController : ControllerBase
{
    private readonly IItemService _itemService;
    private readonly IMapper _mapper;

    public GoodsCountController(IItemService itemService,
        IMapper mapper)
    {
        _itemService = itemService;
        _mapper = mapper;
    }

    /// <summary>
    ///     Get item count specified search model from storage.
    /// </summary>
    /// <param name="model"></param>
    /// <returns>number of items matching search model.</returns>
    /// <response code="200">Returns a number of items matching search model.</response>
    /// <response code="400">Request contains null object or invalid object type.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet]
    [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetGoodsCount([FromQuery] GetGoodsCountRequestModel model)
    {
        try
        {
            var searchParams = _mapper.Map<GoodsCountSearchModel>(model);
            var response = await _itemService
                .GetItemsCountBySearchParametersAsync(searchParams);

            return Ok(response);
        }
        catch (ArgumentException ex)
        {
            Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return BadRequest(new ErrorModel { Message = ex.Message });
        }
        catch (Exception ex)
        {
            Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return StatusCode(500, new ErrorModel { Message = "Unexpected error on the server side." });
        }
    }
}