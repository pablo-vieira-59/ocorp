using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace Backend.Application.Services.Interfaces
{
    public interface IAttachmentService
    {
        Task<ServiceResult<string>> Create(AttachmentCreateDTO request);

        Task<ServiceResult<AttachmentGetDTO>> Get(Guid guid);
    }
}
