using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Helpers.ServiceResultPattern;
using Backend.Application.Services.Interfaces;

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

        public async Task<ServiceResult<List<Permission>>> GetByUser(string userGuid)
        {
            var permissionsQuery = await _permissionRepository.GetByUser(userGuid);

            var permissions = await permissionsQuery.Select(x => new Permission
            {
                Id = x.Id,
                Name = x.Name,
            }).ToListAsync();

            return new OkServiceResult<List<Permission>>(permissions);
        }

        public async Task<ServiceResult<List<Permission>>> GetByProfile(int profileId)
        {
            var permissionsQuery = await _permissionRepository.GetByProfile(profileId);

            var permissions = await permissionsQuery.Select(x => new Permission
            {
                Id = x.Id,
                Name = x.Name,
            }).ToListAsync();

            return new OkServiceResult<List<Permission>>(permissions);
        }

        public async Task<ServiceResult<bool>> EditPermissions(int profileId, List<Permission> newPermissions)
        {
            var profilePermissions = (await this.GetByProfile(profileId)).Value;

            if (profilePermissions == null) return new FailServiceResultStruct<bool>("Permissões não encontradas");

            var currentPermissionsIds = profilePermissions.Select(x => x.Id).ToList();
            var newPermissionsIds = newPermissions.Select(x => x.Id).ToList();

            var pemissionsToAddIds = newPermissionsIds.Where(x => !currentPermissionsIds.Contains(x)).ToList();
            var permissionsToRemoveIds = currentPermissionsIds.Where(x => !newPermissionsIds.Contains(x)).ToList();

            var result = await _permissionRepository.EditProfilePermissions(profileId, pemissionsToAddIds, permissionsToRemoveIds);

            if (result)
            {
                return new OkServiceResultStruct<bool>(true);
            }

            return new FailServiceResultStruct<bool>("Falha ao editar permissões");
        }
    }
}
