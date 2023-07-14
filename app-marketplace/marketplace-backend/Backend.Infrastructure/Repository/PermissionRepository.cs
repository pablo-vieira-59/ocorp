using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repository
{
    public class PermissionRepository : BaseRepository<Permission>, IPermissionRepository
    {
        public PermissionRepository(Context.AppContext context) : base(context)
        {

        }

        public async Task<bool> EditProfilePermissions(int profileId, List<int> permissionsToAdd, List<int> permissionsToRemove)
        {
            var newPermissions = new List<Permission_Profile>();
            foreach (var permission in permissionsToAdd)
            {
                newPermissions.Add(new Permission_Profile { PermissionId = permission, ProfileId = profileId });
            }

            var toRemove = await _context.Permission_Profile.Where(x => x.ProfileId == profileId && permissionsToRemove.Contains(x.PermissionId)).ToListAsync();

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    _context.AddRange(newPermissions);
                    _context.RemoveRange(toRemove);
                    _context.SaveChanges();

                    transaction.Commit();
                    return true;
                }
                catch
                {
                    transaction.Rollback();
                    return false;
                }
            }
        }

        public IQueryable<Permission> GetByProfile(int profileId)
        {
            var permissions = _context.Permission.Where(e => e.Permission_Profiles!.Any(x => x.ProfileId == profileId)).AsQueryable();

            return permissions;
        }

        public IQueryable<Permission> GetByUser(string userGuid)
        {
            var permissions = _context.Permission.Where(e => e.Permission_Profiles!.Any(x => x.Profile!.Users!.Any(y => y.Guid.ToString() == userGuid))).AsQueryable();

            return permissions;
        }

        public IQueryable<Permission> GetByUser(long userId)
        {
            var permissions = _context.Permission.Where(e => e.Permission_Profiles!.Any(x => x.Profile!.Users!.Any(y => y.Id == userId))).AsQueryable();

            return permissions;
        }

    }
}
