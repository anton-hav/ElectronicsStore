using AutoMapper;
using ElectronicsStore.Core.Abstractions.Services;
using ElectronicsStore.Core.DataTransferObjects;
using ElectronicsStore.WebAPI.Models.Requests;
using ElectronicsStore.WebAPI.Models.Responses;
using ElectronicsStore.WebAPI.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ElectronicsStore.WebAPI.Controllers;

/// <summary>
/// Controller that provides API endpoints for the User resource.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IRoleService _roleService;
    private readonly IMapper _mapper;
    private readonly IJwtUtil _jwtUtil;

    public UserController(IUserService userService,
        IRoleService roleService,
        IMapper mapper,
        IJwtUtil jwtUtil)
    {
        _userService = userService;
        _roleService = roleService;
        _mapper = mapper;
        _jwtUtil = jwtUtil;
    }

    // TEST ENDPOINT
    // todo: DELETE THIS CODE
    /// <summary>
    /// Get users
    /// </summary>
    /// <returns>all users</returns>
    [HttpGet]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Get()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }


    /// <summary>
    ///     Register new user
    /// </summary>
    /// <param name="request">new user model</param>
    /// <returns>Access token for newly user</returns>
    /// <response code="200">Returns access token for the newly created user</response>
    /// <response code="400">Request contains null object or invalid object type</response>
    /// <response code="409">The same entry already exists in the storage.</response>
    /// <response code="500">Unexpected error on the server side.</response>
    [HttpPost]
    [ProducesResponseType(typeof(TokenResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(ErrorModel), StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Create([FromBody] RegisterUserRequestModel request)
    {
        try
        {
            var userRoleId = await _roleService.GetRoleIdForDefaultRoleAsync();
            var userDto = _mapper.Map<UserDto>(request);
            var userWithSameEmailExists = await _userService.IsUserExistsAsync(request.Email);

            if (userWithSameEmailExists)
                throw new ArgumentException("The same entry already exists in the storage.", nameof(request));

            if (userDto != null
                && !Guid.Empty.Equals(userRoleId)
                && request.Password.Equals(request.PasswordConfirmation))
            {
                userDto.RoleId = userRoleId;
                var result = await _userService.RegisterUserAsync(userDto);
                if (result > 0)
                {
                    var userInDbDto = await _userService.GetUserByEmailAsync(userDto.Email);

                    var response = await _jwtUtil.GenerateTokenAsync(userInDbDto);

                    return Ok(response);
                }
            }

            throw new ArgumentNullException(nameof(request), "Some register data is incorrect.");
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