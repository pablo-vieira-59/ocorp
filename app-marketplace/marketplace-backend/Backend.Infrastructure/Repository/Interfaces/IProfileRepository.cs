using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IProfileRepository : IBaseRepository<Profile>
    {
        Task<IQueryable<Profile>> GetAvailableToRegister(long userId);
    }
}
