using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using System.Data.Entity;

namespace Backend.Infrastructure.Repository
{
    public class EstablishmentRepository : BaseRepository<Establishment>, IEstablishmentRepository
    {
        public EstablishmentRepository(Context.AppContext context) : base(context)
        {

        }

        public IQueryable<Establishment> GetAllAvailableToRegister(long userId)
        {
            var query = _context.User_Establishment.Where(e => e.UserId == userId).Select(x => x.Establishment).AsQueryable();
            return query!;
        }
    }
}
