using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IEstablishmentRepository : IBaseRepository<Establishment>
    {
        public IQueryable<Establishment> GetClientEstablishments(long userId);
        public IQueryable<Establishment> GetUserEstablishments(long userId);
    }
}
