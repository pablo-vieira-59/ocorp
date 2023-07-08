using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IPermissionRepository : IBaseRepository<Permission>
    {
        public Task<IQueryable<Permission>> GetByUser(string userGuid);
        public Task<IQueryable<Permission>> GetByProfile(int profileId);
        public Task<bool> EditProfilePermissions(int profileId, List<int> permissionsToAdd, List<int> permissionsToRemove);
    }
}
