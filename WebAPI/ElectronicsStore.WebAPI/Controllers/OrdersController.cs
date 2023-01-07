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
///     API controller for the order sheet resource.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class OrdersController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IOrderService _orderService;
    private readonly IUserManager _userManager;

    public OrdersController(IMapper mapper,
        IOrderService orderService,
        IUserManager userManager)
    {
        _mapper = mapper;
        _orderService = orderService;
        _userManager = userManager;
    }

    /// <summary>
    ///     Get an order with specified id from the storage.
    /// </summary>
    /// <param name="id">an order unique identifier as a <see cref="Guid" /></param>
    /// <returns>An order with specified Id</returns>
    /// <response code="200">Returns an order corresponding to the specified identifier.</response>
    /// <response code="404">Failed to find record in the database that match the specified id.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(GetOrderResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(Nullable), StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetOrderById(Guid id)
    {
        try
        {
            var dto = await _orderService.GetByIdAsync(id);
            var response = _mapper.Map<GetOrderResponseModel>(dto);
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
    ///     Get orders from the storage.
    /// </summary>
    /// <returns>all orders that match the search model</returns>
    /// <response code="200">Returns all orders that match the search model.</response>
    /// <response code="400">Request contains null object or invalid object type.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpGet]
    [Authorize]
    [ProducesResponseType(typeof(IEnumerable<GetOrderResponseModel>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetOrders([FromQuery] GetOrdersRequestModel model)
    {
        try
        {
            var searchParams = _mapper.Map<OrdersSearchModel>(model);

            // The administrator can view information about any orders.
            // Users are only allowed to receive information about their orders.
            var isAdmin = _userManager.IsAdmin();
            if (!isAdmin)
            {
                var userId = _userManager.GetUserId();
                searchParams.User.UserId = userId;
            }

            var orders = await _orderService.GetOrdersBySearchParametersAsync(searchParams);
            var response = _mapper.Map<IEnumerable<GetOrderResponseModel>>(orders);
            return Ok(orders);
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
    ///     Create new order list.
    /// </summary>
    /// <returns>A newly created order.</returns>
    /// <response code="200">Returns a newly created order.</response>
    /// <response code="401">Authorization failed, access token is invalid or expired</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> CreateNewOrder([FromBody] AddOrderRequestModel requestModel)
    {
        try
        {
            var userId = _userManager.GetUserId();
            if (!userId.Equals(requestModel.UserId))
                // todo: refactor exception handles with filter and add custom Exceptions.
                throw new ArgumentNullException(nameof(requestModel),
                    "The user token information doesn't compare with request model user Id");

            var isExist =
                await _orderService.IsOrderExistByCreationDateAndUserIdAsync(requestModel.DateTimeOfCreate,
                    requestModel.UserId);
            if (isExist)
                throw new ArgumentException("The same entry already exist in the storage.", nameof(requestModel));

            var dto = _mapper.Map<OrderDto>(requestModel);
            var result = await _orderService.CreateAsync(dto);
            var response = _mapper.Map<GetOrderResponseModel>(dto);

            return CreatedAtAction(nameof(GetOrderById), new { id = response.Id }, response);
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
    ///     Patch an order with specified Id in the storage.
    /// </summary>
    /// <param name="id">an order unique identifier as a <see cref="Guid" /></param>
    /// <param name="model">an order used for patching</param>
    /// <returns>An order with specified Id.</returns>
    /// <response code="200">Returns the updated order</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="409">
    ///     Fail to find a record with the specified Id in the storage
    ///     or the entry with the same property already exists in the storage.
    /// </response>
    /// <response code="500">Unexpected error on the server side.</response>
    [ProducesResponseType(typeof(GetOrderResponseModel), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchBookNote(Guid id, [FromBody] PatchOrderRequestModel model)
    {
        try
        {
            if (id.Equals(default))
                throw new ArgumentNullException(nameof(id), "A non-empty Id is required.");

            var isExistById = await _orderService.IsOrderExistByIdAsync(id);
            if (!isExistById)
                throw new ArgumentException("Fail to find a record with the specified Id in the storage",
                    nameof(id));

            var isValid = await CheckOrderForEditAsync(id, model.UserId, model.DateTimeOfCreate);

            var dto = _mapper.Map<OrderDto>(model);
            dto.Id = id;
            var result = await _orderService.PatchAsync(id, dto);
            var response = _mapper.Map<GetOrderResponseModel>(dto);

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
    ///     Validate an order model for update.
    /// </summary>
    /// <param name="id">a unique identifier that defines the order to be updated </param>
    /// <param name="userId">an user unique identifier</param>
    /// <param name="creationDate">a date and time of the order creation</param>
    /// <returns>A boolean</returns>
    /// <exception cref="ArgumentNullException">If the id is empty.</exception>
    /// <exception cref="ArgumentException">If the same entry already exists in the storage.</exception>
    private async Task<bool> CheckOrderForEditAsync(Guid id, Guid userId, DateTime creationDate)
    {
        var isExist = await _orderService.IsOrderExistByCreationDateAndUserIdAsync(creationDate, userId);

        if (isExist)
        {
            if (!id.Equals(default))
            {
                var isOrderTheSame = await IsOrderTheSameAsync(id, userId, creationDate);

                if (isOrderTheSame) return true;
            }
            else
            {
                throw new ArgumentNullException(nameof(id), "A non-empty Id is required.");
            }

            throw new ArgumentException("The same entry already exists in the storage.", nameof(id));
            ;
        }

        return true;
    }

    /// <summary>
    ///     Check if the existing order is the same.
    /// </summary>
    /// <remarks>
    ///     This check is necessary to ensure idempotent behavior of the PUT method.
    /// </remarks>
    /// <param name="id">order unique identifier</param>
    /// <param name="userId">user unique identifier</param>
    /// <param name="creationDate">a date and time of the order creation</param>
    /// <returns>A boolean</returns>
    private async Task<bool> IsOrderTheSameAsync(Guid id, Guid userId, DateTime creationDate)
    {
        var dto = await _orderService.GetByIdAsync(id);
        return dto.UserId.Equals(userId) && dto.DateTimeOfCreate.Equals(creationDate);
    }
}