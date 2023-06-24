using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IProfileService
    {
        Task<ServiceResult<List<Profile>>> AllDetails(FilterDTO filter);
        Task<ServiceResult<int>> AllDetailsCount(FilterDTO filter);
        Task<ServiceResult<List<Profile>>> GetAll();
    }
}
