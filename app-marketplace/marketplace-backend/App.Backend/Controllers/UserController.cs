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

        [HttpPost("new-user")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDTO user)
        {
            try
            {
                var result = await _userService.CreateUserAsync(user);

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
            var result = await _userService.GetUserById(userId);

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

        [FreeAccess]
        [HttpPost("create-new-costumer-user")]
        public async Task<IActionResult> CreateNewCostumerUser(CreateUserDTO user)
        {
            try
            {
                await _userService.CreateNewCostumerUserAsync(user);
                return Ok(true);
            }
            catch (Exception ex)
            {
                _logger.LogError($"UserController - Create New Costumer User - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}