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
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _establishmentService.AllDetails(filter, currentUser.Value!);
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
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _establishmentService.AddEstablishment(establishment, currentUser.Value!);

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

        [HttpGet("client/{clientId}")]
        public async Task<IActionResult> GetClientEstablishments(long clientId)
        {
            try
            {
                var result = await _establishmentService.GetClientEstablishments(clientId);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }
                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"EstablishmentController - GetClientEstablishments - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserEstablishments(long userId)
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
                _logger.LogError($"EstablishmentController - GetUserEstablishments - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}