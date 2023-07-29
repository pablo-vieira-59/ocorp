using Microsoft.AspNetCore.Mvc;
using Backend.Application.Services.Interfaces;
using Backend.Domain.DTO;

namespace App.Backend.Livraria.Controllers
{
    [ApiController]
    [Route("suppliers")]
    public class SupplierController : ControllerBase
    {
        private readonly ILogger<BrandController> _logger;
        private readonly IUserService _userService;
        private readonly ISupplierService _supplierService;

        public SupplierController(ILogger<BrandController> logger, IUserService userService, ISupplierService supplierService)
        {
            _logger = logger;
            _userService = userService;
            _supplierService = supplierService;
        }

        [HttpPost("new")]
        public async Task<IActionResult> Create([FromBody] SupplierCreateDTO request)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if(!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _supplierService.Create(request, currentUser.Value!);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"SupplierController - Create - {ex.Message}");
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

                var result = await _supplierService.AllPaginated(filter, currentUser.Value!);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"SupplierController - AllPaginated - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var result = await _supplierService.GetById(id);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"SupplierController - GetById - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("edit/{id}")]
        public async Task<IActionResult> Edit(SupplierEditDTO request)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _supplierService.Edit(request, currentUser.Value!);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"SupplierController - Edit - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}