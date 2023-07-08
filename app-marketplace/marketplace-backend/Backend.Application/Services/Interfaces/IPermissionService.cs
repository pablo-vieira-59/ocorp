using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IPermissionService
    {
        Task<ServiceResult<List<Profile>>> AllDetails(FilterDTO filter);
        Task<ServiceResult<List<Permission>>> GetByUser(string userGuid);
        Task<ServiceResult<List<Permission>>> GetByProfile(int profileId);
        Task<ServiceResult<bool>> EditPermissions(int profileId, List<Permission> permissions);
    }
}
