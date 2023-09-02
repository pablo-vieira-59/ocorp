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
    [Route("products")]
    public class ProductController : ControllerBase
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IUserService _userService;
        private readonly IProductService _productService;

        public ProductController(ILogger<ProductController> logger, IUserService userService, IProductService productService)
        {
            _logger = logger;
            _userService = userService;
            _productService = productService;
        }

        [HttpPost("new")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductCreateDTO user)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _productService.Create(user, currentUser!.Value!);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"ProductController - CreateProduct - {ex.Message}");
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

                var result = await _productService.AllPaginated(filter, currentUser.Value!);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"ProductController - AllPaginated - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var result = await _productService.GetById(id);

                if (!result.Success)
                {
                    return BadRequest("Falha ao obter produto.");
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"ProductController - GetById - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(UserEditDTO userData)
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
                    return BadRequest("Falha ao editar produto.");
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"ProductController - Edit - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}