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
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(Context.AppContext context) : base(context)
        {

        }

        public IQueryable<User> GetByUsername(string userName)
        {
            var query = _context.User.Where(e => e.Username == userName).AsQueryable();

            return query;
        }
    }
}
