using AutoMapper;
using ElectronicsStore.Business.SearchModelImplementations;
using ElectronicsStore.Core.Abstractions.IdentityManagers;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers;

/// <summary>
///     API controller for the purchases resource.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class PurchasesController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IPurchaseService _purchaseService;
    private readonly IOrderService _orderService;
    private readonly IUserManager _userManager;

    public PurchasesController(IMapper mapper,
        IPurchaseService purchaseService,
        IOrderService orderService,
        IUserManager userManager)
    {
        _mapper = mapper;
        _purchaseService = purchaseService;
        _orderService = orderService;
        _userManager = userManager;
    }

    /// <summary>
    ///     Get a purchase with specified id from the storage.
    /// </summary>
    /// <param name="id">a purchase unique identifier as a <see cref="Guid" /></param>
    /// <returns>A purchase that matches the id</returns>
    /// <response code="200">Returns  a purchase corresponding to the specified identifier.</response>
    /// <response code="404">Failed to find record in the database that match the specified id.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetPurchaseResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetPurchaseById(Guid id)
    {
        try
        {
            var dto = await _purchaseService.GetByIdAsync(id);
            var response = _mapper.Map<GetPurchaseResponseModel>(dto);
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
    ///     Get purchases from the storage.
    /// </summary>
    /// <returns>all purchases that match the search model</returns>
    /// <response code="200">Returns all purchases that match the search model.</response>
    /// <response code="400">Request contains null object or invalid object type.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet]
    [Authorize]
    [ProducesResponseType(typeof(IEnumerable<GetPurchaseResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPurchases([FromQuery] GetPurchasesRequestModel model)
    {
        try
        {
            var searchParams = _mapper.Map<PurchasesSearchModel>(model);

            // The administrator can view information about any orders.
            // Users are only allowed to receive information about their purchases.
            var isAdmin = _userManager.IsAdmin();
            if (!isAdmin)
            {
                var userId = _userManager.GetUserId();
                searchParams.User.UserId = userId;
            }

            var purchases = await _purchaseService.GetPurchasesBySearchParametersAsync(searchParams);
            var response = _mapper.Map<IEnumerable<GetPurchaseResponseModel>>(purchases);
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

    /// <summary>
    ///     Create new purchase.
    /// </summary>
    /// <returns>A newly created purchase.</returns>
    /// <response code="200">Returns a newly created purchase.</response>
    /// <response code="401">Authorization failed, access token is invalid or expired</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateNewPurchase([FromBody] AddPurchaseRequestModel model)
    {
        try
        {
            var userId = _userManager.GetUserId();
            var order = await _orderService.GetByIdAsync(model.OrderId);

            if (!userId.Equals(order.UserId))
                throw new ArgumentNullException(nameof(model),
                    "The user token information doesn't compare with request model user Id");

            var isExist =
                await _purchaseService.IsPurchaseExistByOrderIdAndItemIdAsync(model.OrderId, model.ItemId);
            if (isExist)
                throw new ArgumentException("The same entry already exist in the storage.", nameof(model));

            var dto = _mapper.Map<PurchaseDto>(model);
            var result = await _purchaseService.CreateAsync(dto);
            var response = _mapper.Map<GetPurchaseResponseModel>(dto);

            return CreatedAtAction(nameof(GetPurchaseById), new { id = response.Id }, response);
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
}