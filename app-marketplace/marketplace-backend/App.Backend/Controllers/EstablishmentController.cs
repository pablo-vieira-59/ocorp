using Backend.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Backend.Application.Services.Interfaces;
using Backend.Domain.DTO;
using System.Reflection;
using Backend.Domain.Helpers;

namespace App.Backend.Livraria.Controllers
{
    [ApiController]
    [Route("establishments")]
    public class EstablishmentController : ControllerBase
    {
        private readonly ILogger<EstablishmentController> _logger;
        private readonly IEstablishmentService _establishmentService;

        public EstablishmentController(ILogger<EstablishmentController> logger, IEstablishmentService establishmentService)
        {
            _logger = logger;
            _establishmentService = establishmentService;
        }

        [HttpPost("all-details")]
        public async Task<IActionResult> AllDetails([FromBody] FilterDTO filter)
        {
            try
            {
                var result = await _establishmentService.AllDetails(filter);
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
                _logger.LogError($"UserController - AllDetails - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}