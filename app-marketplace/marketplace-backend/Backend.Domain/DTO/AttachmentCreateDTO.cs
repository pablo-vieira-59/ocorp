using Microsoft.AspNetCore.Http;

namespace Backend.Domain.DTO
{
    public class AttachmentCreateDTO
    {
        public required IFormFile File { get; set; }

        public int AttachmentTypeId { get; set; }
    }


}
