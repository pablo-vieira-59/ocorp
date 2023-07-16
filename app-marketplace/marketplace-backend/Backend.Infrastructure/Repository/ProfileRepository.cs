using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repository
{
    public class ProfileRepository : BaseRepository<Profile>, IProfileRepository
    {
        public ProfileRepository(Context.AppContext context) : base(context)
        {
            
        }

        public async Task<IQueryable<Profile>> GetAvailableToRegister(long userId)
        {
            var user = await _context.User.Where(x => x.Id == userId).FirstOrDefaultAsync();

            var permissions = await _context.Permission_Profile.Where(x => x.ProfileId == user!.ProfileId).ToListAsync();

            var permissionsId = permissions.Select(x => x.PermissionId).ToList();

            var availableProfiles = _context.Profile.Where(x => permissionsId.Contains(x.PermissionId)).AsQueryable();

            return availableProfiles;
        }
    }
}
