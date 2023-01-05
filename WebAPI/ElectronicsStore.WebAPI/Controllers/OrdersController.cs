using AutoMapper;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers
{
    /// <summary>
    /// API controller for the order sheet resource.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IOrderService _orderService;

        public OrdersController(IMapper mapper, 
            IOrderService orderService)
        {
            _mapper = mapper;
            _orderService = orderService;
        }

        /// <summary>
        /// Get an order from storage with specified id.
        /// </summary>
        /// <param name="id">an order unique identifier as a <see cref="Guid"/></param>
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
        /// Create new order list.
        /// </summary>
        /// <returns>An anonymous object contains the thanksgiving message</returns>
        /// <response code="200">Returns a thanksgiving message</response>
        /// <response code="401">Authorization failed, access token is invalid or expired</response>
        /// <response code="500">Unexpected error on the server side.</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateNewOrder([FromBody] AddOrderModel model)
        {
            try
            {
                var isExist =
                    await _orderService.IsOrderExistByCreationDateAndUserIdAsync(model.DateTimeOfCreate, model.UserId);
                if (isExist)
                    throw new ArgumentException("The same entry already exist in the storage.", nameof(model));

                var dto = _mapper.Map<OrderDto>(model);
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
    }
}
