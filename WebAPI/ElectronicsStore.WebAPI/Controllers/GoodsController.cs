using AutoMapper;
using ElectronicsStore.Business.ServiceImplementations;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GoodsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IItemService _itemService;

    public GoodsController(IMapper mapper,
        IItemService itemService)
    {
        _mapper = mapper;
        _itemService = itemService;
    }

    /// <summary>
    ///     Get goods note from storage with specified id.
    /// </summary>
    /// <param name="id">a goods unique identifier as a <see cref="Guid" /></param>
    /// <returns>An item with specified Id</returns>
    /// <response code="200">Returns an item corresponding to the specified identifier.</response>
    /// <response code="404">Failed to find record in the database that match the specified id.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetItemResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetItemById(Guid id)
    {
        try
        {
            var item = await _itemService.GetItemWithPropertiesByIdAsync(id);
            var response = _mapper.Map<GetItemResponseModel>(item);
            return Ok(response);
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
    ///     Get goods from storage.
    /// </summary>
    /// <returns>all goods</returns>
    /// <response code="200">Returns all goods.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<GetItemResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetGoods([FromQuery] GetGoodsRequestModel model)
    {
        try
        {
            var searchParams = _mapper.Map<GoodsSearchParameters>(model);
            var goods = await _itemService.GetItemsBySearchParametersAsync(searchParams);
            var response = _mapper.Map<IEnumerable<GetItemResponseModel>>(goods);
            return Ok(response);
        }
        catch (Exception ex)
        {
            Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
            return StatusCode(500, new ErrorModel { Message = "Unexpected error on the server side." });
        }
    }
}