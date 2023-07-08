using Backend.Domain.Models;
using Backend.Infrastructure.Context;
using Backend.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repository
{
    public class UserAccessRepository : BaseRepository<UserAccess>, IUserAccessRepository
    {
        public UserAccessRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
