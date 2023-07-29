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
    [Route("brands")]
    public class BrandController : ControllerBase
    {
        private readonly ILogger<BrandController> _logger;
        private readonly IUserService _userService;
        private readonly IProductService _productService;
        private readonly IBrandService _brandService;

        public BrandController(ILogger<BrandController> logger, IUserService userService, IProductService productService, IBrandService brandService)
        {
            _logger = logger;
            _userService = userService;
            _productService = productService;
            _brandService = brandService;
        }

        [HttpPost("new")]
        public async Task<IActionResult> CreateBrand([FromBody] BrandCreateDTO request)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                var result = await _brandService.Create(request, currentUser.Value!);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"BrandController - CreateBrand - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("all-paginated")]
        public async Task<IActionResult> AllPaginated([FromBody] FilterDTO filter)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _brandService.AllPaginated(filter, currentUser.Value!);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"BrandController - AllPaginated - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var result = await _brandService.GetById(id);

                if (!result.Success)
                {
                    return BadRequest("Falha ao obter marca.");
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"BrandController - GetById - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(BrandEditDTO request)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _brandService.Edit(request, currentUser.Value!);

                if (!result.Success)
                {
                    return BadRequest("Falha ao editar marca.");
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"BrandController - Edit - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}