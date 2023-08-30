using Microsoft.AspNetCore.Mvc;
using Backend.Application.Services.Interfaces;
using Backend.Domain.DTO;

namespace App.Backend.Livraria.Controllers
{
    [ApiController]
    [Route("batches")]
    public class BatchController : ControllerBase
    {
        private readonly ILogger<BatchController> _logger;
        private readonly IUserService _userService;
        private readonly IBatchService _batchService;

        public BatchController(ILogger<BatchController> logger, IUserService userService, IBatchService batchService)
        {
            _logger = logger;
            _userService = userService;
            _batchService = batchService;
        }

        [HttpPost("new")]
        public async Task<IActionResult> Create([FromBody] BatchCreateDTO request)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _batchService.Create(request, currentUser.Value!);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"BatchController - Create - {ex.Message}");
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

                var result = await _batchService.AllPaginated(filter, currentUser.Value!);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"BatchController - AllPaginated - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(long id)
        {
            try
            {
                var result = await _batchService.GetById(id);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"BatchController - GetById - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetStatusList()
        {
            try
            {
                var result = await _batchService.GetStatusList();

                if (result.Success)
                {
                    return Ok(result.Value);
                }

                return BadRequest(result.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError($"BatchController - GetStatusList - {ex.Message}");
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit(BatchChangeStatusDTO request)
        {
            try
            {
                var currentUser = await _userService.GetCurrentUser(HttpContext);

                if (!currentUser.Success)
                {
                    return BadRequest(currentUser.Message);
                }

                var result = await _batchService.Edit(request, currentUser.Value!);

                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"BatchController - ChangeStatus - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }
    }
}