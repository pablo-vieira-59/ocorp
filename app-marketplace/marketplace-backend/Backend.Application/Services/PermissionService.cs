using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services
{
    public class PermissionService : IPermissionService
    {
        IPermissionRepository _permissionRepository;

        public PermissionService(IPermissionRepository permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }

        public async Task<ServiceResult<List<Profile>>> AllDetails(FilterDTO filter)
        {
            var users = await _permissionRepository.Get(filter).Select(e => new Profile
            {
                Id = e.Id,
                Name = e.Name,
            }).ToListAsync();

            return new OkServiceResult<List<Profile>>(users);
        }

        public async Task<ServiceResult<int>> AllDetailsCount(FilterDTO filter)
        {
            var result = await _permissionRepository.Get(filter).CountAsync();

            return new OkServiceResultStruct<int>(result);
        }

        public async Task<ServiceResult<List<Permission>>> GetByUser(string userGuid)
        {
            var permissions = await _permissionRepository.GetByUser(userGuid);

            return new OkServiceResult<List<Permission>>(permissions);
        }
    }
}
