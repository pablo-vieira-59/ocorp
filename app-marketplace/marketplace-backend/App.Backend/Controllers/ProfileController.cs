using Backend.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Application.Services.Interfaces;
using Backend.Domain.DTO;
using System.Reflection;
using Backend.Domain.Helpers;
using Backend.Application.Services;

namespace App.Backend.Livraria.Controllers
{
    [ApiController]
    [Route("profiles")]
    public class ProfileController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IProfileService _profileService;
        private readonly IUserService _userService;

        public ProfileController(ILogger<UserController> logger, IProfileService profileService, IUserService userService)
        {
            _logger = logger;
            _profileService = profileService;
            _userService = userService;
        }

        [HttpPost("all-details")]
        public async Task<IActionResult> AllDetails([FromBody] FilterDTO filter)
        {
            try
            {
                var result = await _profileService.AllDetails(filter);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"UserController - AllDetails - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _profileService.GetAll();
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"ProfileController - GetAll - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all-available")]
        public async Task<IActionResult> GetAllAvailableToRegister()
        {
            try
            {
                User? currentUser = null;

                var currentUserAccess = AuthMiddlewareExtensions.GetCurrentUser(HttpContext);

                if (currentUserAccess != null)
                {
                    currentUser = (await _userService.GetById(currentUserAccess.UserId)).Value;
                }

                if (currentUserAccess == null || currentUser == null)
                {
                    return BadRequest("Usuário não identificado.");
                }

                var result = await _profileService.GetAllAvailableToRegister(currentUser.Id);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"ProfileController - GetAllAvailable - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-by-id/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _profileService.GetById(id);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"ProfileController - GetById - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}