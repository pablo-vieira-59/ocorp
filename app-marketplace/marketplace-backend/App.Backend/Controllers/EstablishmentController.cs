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
    [Route("establishments")]
    public class EstablishmentController : ControllerBase
    {
        private readonly ILogger<EstablishmentController> _logger;
        private readonly IEstablishmentService _establishmentService;
        private readonly IUserService _userService;

        public EstablishmentController(ILogger<EstablishmentController> logger, IEstablishmentService establishmentService, IUserService userService)
        {
            _logger = logger;
            _establishmentService = establishmentService;
            _userService = userService;
        }

        [HttpPost("all-details")]
        public async Task<IActionResult> AllDetails([FromBody] FilterDTO filter)
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

                var result = await _establishmentService.AllDetails(filter, currentUser.Id);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"EstablishmentController - AllDetails - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddEstablishment([FromBody] CreateEstablishmentDTO establishment)
        {
            try
            {
                var result = await _establishmentService.AddEstablishment(establishment);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"EstablishmentController - AllDetails - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all-available")]
        public async Task<IActionResult> GetAllAvailable()
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

                var result = await _establishmentService.GetAllAvailableToRegister(currentUser);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"EstablishmentController - GetAllAvailable - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get-all-available/{userId}")]
        public async Task<IActionResult> GetAllAvailable(long userId)
        {
            try
            {
                var result = await _establishmentService.GetUserEstablishments(userId);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"EstablishmentController - GetAllAvailable - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}