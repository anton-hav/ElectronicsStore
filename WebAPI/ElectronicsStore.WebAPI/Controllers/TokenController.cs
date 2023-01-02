using AutoMapper;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;
using ElectronicsStore.WebAPI.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IJwtUtil _jwtUtil;

        public TokenController(IUserService userService,
            IMapper mapper,
            IJwtUtil jwtUtil)
        {
            _userService = userService;
            _mapper = mapper;
            _jwtUtil = jwtUtil;
        }


        /// <summary>
        /// Create new access token for the login data model
        /// </summary>
        /// <param name="request">login model</param>
        /// <returns>An access token for an authorized user.</returns>
        /// <response code="200">Returns the access token for the authorized user</response>
        /// <response code="400">Request contains null object or invalid object type</response>
        /// <response code="500">Unexpected error on the server side.</response>
        [HttpPost]
        [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateJwtToken([FromBody] LoginUserRequestModel request)
        {
            try
            {
                var user = await _userService.GetUserByEmailAsync(request.Email);

                var isPassCorrect = await _userService.CheckUserPasswordAsync(request.Email, request.Password);

                if (!isPassCorrect)
                {
                    var message = "Password is incorrect.";
                    Log.Information(message);
                    return BadRequest(new ErrorModel { Message = message });
                }

                var response = await _jwtUtil.GenerateTokenAsync(user);
                
                return Ok(response);
            }
            catch (ArgumentException ex)
            {
                Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
                return BadRequest(new ErrorModel { Message = ex.Message });
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return StatusCode(500);
            }
        }


        /// <summary>
        /// Create new token by refresh token.
        /// </summary>
        /// <param name="request">a refresh token value</param>
        /// <returns>new access token for authorized user</returns>
        /// <response code="200">Returns the access token for the authorized user</response>
        /// <response code="400">Request contains null object or invalid object type</response>
        /// <response code="500">Unexpected error on the server side.</response>
        [Route("Refresh")]
        [HttpPost]
        [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestModel request)
        {
            try
            {
                var user = await _userService.GetUserByRefreshTokenAsync(request.RefreshToken);

                var response = await _jwtUtil.GenerateTokenAsync(user);

                await _jwtUtil.RemoveRefreshTokenAsync(request.RefreshToken);

                return Ok(response);

            }
            catch (ArgumentException ex)
            {
                Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
                return BadRequest(new ErrorModel { Message = ex.Message });
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return StatusCode(500);
            }
        }

        /// <summary>
        /// Revoke access token by the refresh token value
        /// </summary>
        /// <param name="request">a refresh token value</param>
        /// <returns>The Ok status</returns>
        /// <response code="200">an empty</response>
        /// <response code="400">Request contains null object or invalid object type</response>
        /// <response code="500">Unexpected error on the server side.</response>
        [Route("Revoke")]
        [HttpPost]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> RevokeToken([FromBody] RefreshTokenRequestModel request)
        {
            try
            {
                await _jwtUtil.RemoveRefreshTokenAsync(request.RefreshToken);
                return Ok();

            }
            catch (ArgumentException ex)
            {
                Log.Warning($"{ex.Message}. {Environment.NewLine} {ex.StackTrace}");
                return BadRequest(new ErrorModel { Message = ex.Message });
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message);
                return StatusCode(500);
            }
        }
    }
}
