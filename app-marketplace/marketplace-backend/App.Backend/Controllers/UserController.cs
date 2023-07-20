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
                User? currentUser = null;

                var currentUserAccess = AuthMiddlewareExtensions.GetCurrentUser(HttpContext);

                if (currentUserAccess != null)
                {
                    currentUser = (await _userService.GetById(currentUserAccess.UserId)).Value;
                }

                var result = await _userService.CreateUserAsync(user, currentUser);

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
                var result = await _userService.AllDetails(filter);
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
                    return BadRequest("Falha ao obter usuário");
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
                User? currentUser = null;

                var currentUserAccess = AuthMiddlewareExtensions.GetCurrentUser(HttpContext);

                if (currentUserAccess != null)
                {
                    currentUser = (await _userService.GetById(currentUserAccess.UserId)).Value;
                }

                if(currentUser == null)
                {
                    return BadRequest("Falha ao obter usuário");
                }

                var result = await _userService.EditUser(userData, currentUser);

                if (!result.Success)
                {
                    return BadRequest("Falha ao editar usuário");
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