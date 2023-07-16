using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IProfileService
    {
        Task<ServiceResult<PaginatedResult<Profile>>> AllDetails(FilterDTO filter);
        Task<ServiceResult<List<Profile>>> GetAll();
        Task<ServiceResult<Profile>> GetById(int profileId);
        Task<ServiceResult<List<Profile>>> GetAllAvailableToRegister(long userId);
    }
}
