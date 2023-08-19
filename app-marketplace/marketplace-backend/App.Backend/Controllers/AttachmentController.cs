using Microsoft.AspNetCore.Mvc;
using Backend.Application.Services.Interfaces;
using Backend.Domain.DTO;
using Backend.Domain.Models;
using App.Backend.Livraria.Middleware;

namespace App.Backend.Livraria.Controllers
{
    [ApiController]
    [Route("attachment")]
    public class AttachmentController : ControllerBase
    {
        private readonly ILogger<AttachmentController> _logger;
        private readonly IAttachmentService _attachmentService;

        public AttachmentController(ILogger<AttachmentController> logger, IAttachmentService attachmentService)
        {
            _logger = logger;
            _attachmentService = attachmentService;
        }

        [FreeAccess]
        [HttpPost("upload")]
        public async Task<IActionResult> UploadAttachment([FromForm]AttachmentCreateDTO request)
        {
            try
            {
                var result = await _attachmentService.Create(request);

                if (result.Success)
                {
                    return Ok(new Attachment { Guid = new Guid(result.Value!)});
                }

                return BadRequest(result.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [FreeAccess]
        [HttpGet("{guid}")]
        public async Task<IActionResult> GetAttachment(Guid guid)
        {
            try
            {
                var result = await _attachmentService.Get(guid);

                if(result.Success)
                {
                    return File(result.Value!.Data, result.Value.Type);
                }

                return BadRequest(result.Message);
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}