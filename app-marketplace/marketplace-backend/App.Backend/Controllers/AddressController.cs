using Microsoft.AspNetCore.Mvc;
using Backend.Application.Services.Interfaces;
using Backend.Domain.DTO;

namespace App.Backend.Livraria.Controllers
{
    [ApiController]
    [Route("address")]
    public class AddressController : ControllerBase
    {
        private readonly ILogger<AddressController> _logger;
        private readonly IUserService _userService;
        private readonly IAddressService _addressService;

        public AddressController(ILogger<AddressController> logger, IUserService userService, IAddressService addressService)
        {
            _logger = logger;
            _userService = userService;
            _addressService = addressService;
        }

        //[HttpPost("new")]
        //public async Task<IActionResult> Create([FromBody] BatchCreateDTO request)
        //{
        //    try
        //    {
        //        var currentUser = await _userService.GetCurrentUser(HttpContext);

        //        if (!currentUser.Success)
        //        {
        //            return BadRequest(currentUser.Message);
        //        }

        //        var result = await _batchService.Create(request, currentUser.Value!);

        //        if (!result.Success)
        //        {
        //            return BadRequest(result.Message);
        //        }

        //        return Ok(result.Value);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"AddressController - Create - {ex.Message}");
        //        return BadRequest(ex.Message);
        //    }
        //}

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

                var result = await _addressService.AllPaginated(filter, currentUser.Value!);
                if (!result.Success)
                {
                    return BadRequest(result.Message);
                }

                return Ok(result.Value);
            }
            catch (Exception ex)
            {
                _logger.LogError($"AddressController - AllPaginated - {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetById(long id)
        //{
        //    try
        //    {
        //        var result = await _batchService.GetById(id);

        //        if (!result.Success)
        //        {
        //            return BadRequest(result.Message);
        //        }

        //        return Ok(result.Value);
        //    }
        //    catch (Exception ex)
        //    {
        //        _logger.LogError($"AddressController - GetById - {ex.Message}");
        //        return BadRequest(ex.Message);
        //    }
        //}

    }
}