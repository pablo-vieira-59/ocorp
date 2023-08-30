using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;

namespace Backend.Infrastructure.Repository
{
    public class UserAccessRepository : BaseRepository<UserAccess>, IUserAccessRepository
    {
        public UserAccessRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
