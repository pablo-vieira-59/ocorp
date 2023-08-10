using Backend.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Application.Services.Interfaces;
using Backend.Domain.DTO;
using System.Reflection;
using Backend.Domain.Helpers;
using App.Backend.Livraria.Middleware;

namespace App.Backend.Livraria.Controllers
{
    [ApiController]
    [Route("users")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [FreeAccess]
        [HttpPost("new-user")]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDTO user)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                var result = await _userService.CreateUserAsync(user, currentUser.Value);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"UserController - Create User - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [FreeAccess]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO user)
        {
            try
            {
                var result = await _userService.Login(user);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch(Exception ex)
            {
                _logger.LogError($"UserController - Login - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("detail/{userId}")]
        public async Task<IActionResult> GetUserDetail(long userId)
        {
            var result = await _userService.GetDetails(userId);

            if (!result.Success)
            {
                return NotFound();
            }

            return Ok(result.Value);
        }

        [HttpPost("all-details")]
        public async Task<IActionResult> AllDetails([FromBody] FilterDTO filter)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _userService.AllDetails(filter, currentUser.Value!);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"UserController - Get All Users - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("is-logged-in")]
        public async Task<IActionResult> IsLoggedIn()
        {
            try
            {
                await Task.CompletedTask;
                return Ok(true);
            }
            catch (Exception ex)
            {
                _logger.LogError($"UserController - Is Logged In - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetById(long userId)
        {
            try
            {
                var result = await _userService.GetById(userId);

                if (!result.Success)
                {
                    return BadRequest("Falha ao obter usu�rio");
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"UserController - GetById - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("guid/{userGuid}")]
        public async Task<IActionResult> GetByGuid(string userGuid)
        {
            try
            {
                var result = await _userService.GetByGuid(userGuid);

                if (!result.Success)
                {
                    return BadRequest("Falha ao obter usu�rio");
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"UserController - GetById - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("edit/{userId}")]
        public async Task<IActionResult> EditUser(UserEditDTO userData)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _userService.EditUser(userData, currentUser.Value!);

                if (!result.Success)
                {
                    return BadRequest("Falha ao editar usu�rio");
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"UserController - EditUser - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}