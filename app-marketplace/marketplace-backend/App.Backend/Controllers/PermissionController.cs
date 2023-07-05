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
    [Route("permissions")]
    public class PermissionController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IPermissionService _permissionService;

        public PermissionController(ILogger<UserController> logger, IPermissionService permissionService)
        {
            _logger = logger;
            _permissionService = permissionService;
        }

        [HttpPost("all-details")]
        public async Task<IActionResult> AllDetails([FromBody] FilterDTO filter)
        {
            try
            {
                var result = await _permissionService.AllDetails(filter);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"PermissionController - AllDetails - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("all-details/count")]
        public async Task<IActionResult> AllDetailsCount([FromBody] FilterDTO filter)
        {
            try
            {
                var resultCount = await _permissionService.AllDetailsCount(filter);

                if (!resultCount.Success)
                {
                    return BadRequest(resultCount.Message);
                }

                return Ok(resultCount.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"PermissionController - AllDetailsCount - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [FreeAccess]
        [HttpGet("user/{userGuid}")]
        public async Task<IActionResult> GetByUser(string userGuid)
        {
            try
            {
                var result = await _permissionService.GetByUser(userGuid);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"PermissionController - GetByUser - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("profile/{profileId}")]
        public async Task<IActionResult> GetByProfile(int profileId)
        {
            try
            {
                var result = await _permissionService.GetByProfile(profileId);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"PermissionController - GetByProfile - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [FreeAccess]
        [HttpPost("profile/edit-permissions")]
        public async Task<IActionResult> GetByProfile(EditProfilePermissionsRequestDTO request)
        {
            try
            {
                var result = await _permissionService.EditPermissions(request.ProfileId, request.Permissions);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"PermissionController - GetByProfile - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}