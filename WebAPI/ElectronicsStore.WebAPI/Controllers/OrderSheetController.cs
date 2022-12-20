using ElectronicsStore.WebAPI.Models.Responses;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers
{        
    // This controller represents the "Order Sheet" resource.
    // The sheet is created at the moment of checkout or payment.
    // Since there are a number of additional operations between order placement
    // and payment in the online store, this resource is different from the "Check" resource
    // (which will probably be added later).

    /// <summary>
    /// API controller for the order sheet resource.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class OrderSheetController : ControllerBase
    {
        // Creating a new order sheet is equivalent to the Purchase method.

        /// <summary>
        /// Create new order list.
        /// </summary>
        /// <remarks>
        /// Warning. The endpoint sends a message instead of the created resource.
        /// It is a requirement of the specification. The endpoint behavior
        /// perhaps will change in the future.
        /// </remarks>
        /// <returns>An anonymous object contains the thanksgiving message</returns>
        /// <response code="200">Returns a thanksgiving message</response>
        /// <response code="401">Authorization failed, access token is invalid or expired</response>
        /// <response code="500">Unexpected error on the server side.</response>
        [HttpPost]
        [Authorize]
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public IActionResult CreateNewOrderList()
        {
            try
            {
                var message = "Thank you for your purchase!";
                return Ok(new {Message = message});
            }
            catch (Exception ex)
            {
                Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
                return StatusCode(500, new ErrorModel { Message = "Unexpected error on the server side." });
            }
        }
    }
}
