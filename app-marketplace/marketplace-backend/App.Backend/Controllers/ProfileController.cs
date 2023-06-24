using Backend.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Application.Services.Interfaces;
using Backend.Domain.DTO;
using System.Reflection;
using Backend.Domain.Helpers;

namespace App.Backend.Livraria.Controllers
{
    [ApiController]
    [Route("profiles")]
    public class ProfileController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IProfileService _profileService;

        public ProfileController(ILogger<UserController> logger, IProfileService profileService)
        {
            _logger = logger;
            _profileService = profileService;
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

        [HttpPost("all-details/count")]
        public async Task<IActionResult> AllDetailsCount([FromBody] FilterDTO filter)
        {
            try
            {
                var resultCount = await _profileService.AllDetailsCount(filter);

                if (!resultCount.Success)
                {
                    return BadRequest(resultCount.Message);
                }

                return Ok(resultCount.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"ProfileController - AllDetailsCount - {ex.Message}");
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
    }
}