using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoodsCountController : ControllerBase
    {
        private readonly IItemService _itemService;

        public GoodsCountController(IItemService itemService)
        {
            _itemService = itemService;
        }

        /// <summary>
        /// Get item count specified search parameters from storage.
        /// </summary>
        /// <param name="model"></param>
        /// <returns>number of items</returns>
        [HttpGet]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetGoodsCount([FromQuery] GetGoodsCountRequestModel model)
        {
            try
            {
                var response = await _itemService
                    .GetItemsCountBySearchParametersAsync();

                return Ok(response);
            }
            catch (Exception ex)
            {
                Log.Error($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
                return StatusCode(500, new ErrorModel { Message = "Unexpected error on the server side." });
            }
        }
    }
}
