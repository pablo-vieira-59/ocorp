using Backend.Domain.Models;
using Backend.Infrastructure.Context;
using Backend.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository
{
    public class PermissionRepository : BaseRepository<Permission>, IPermissionRepository
    {
        public PermissionRepository(Context.AppContext context) : base(context)
        {

        }

        public async Task<List<Permission>> GetByUser(string userGuid)
        {
            var permissions = await _context.Permission.Where(
                e => e.Permission_Profiles.Any(x => x.Profile.Users.Any(y => y.Guid.ToString() == userGuid))).ToListAsync();

            return permissions;
        }
    }
}
