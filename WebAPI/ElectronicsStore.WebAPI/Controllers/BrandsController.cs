using AutoMapper;
using ElectronicsStore.Business.SearchParametersImplementations;
using ElectronicsStore.Business.ServiceImplementations;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers
{
    /// <summary>
    /// Controller that provides API endpoints for the Brands resource.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IBrandService _brandService;

        public BrandsController(IMapper mapper, 
            IBrandService brandService)
        {
            _mapper = mapper;
            _brandService = brandService;
        }

        /// <summary>
        ///     Get brands from the storage.
        /// </summary>
        /// <returns>all brands that match the search parameters.</returns>
        /// <response code="200">Returns all brands that match the search parameters.</response>
        /// <response code="400">Request contains null object or invalid object type.</response>
        /// <response code="500">Unexpected error on the server side.</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<GetBrandResponseModel>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetBrands([FromQuery] GetBrandsRequestModel model)
        {
            try
            {
                var searchParams = _mapper.Map<BrandSearchParameters>(model);
                var brands = await _brandService.GetBrandsBySearchParametersAsync(searchParams);
                var response = _mapper.Map<IEnumerable<GetBrandResponseModel>>(brands);
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
}
