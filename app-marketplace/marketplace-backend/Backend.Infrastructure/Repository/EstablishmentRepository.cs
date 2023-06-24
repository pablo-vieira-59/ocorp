using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;

namespace Backend.Infrastructure.Repository
{
    public class EstablishmentRepository : BaseRepository<Establishment>, IEstablishmentRepository
    {
        public EstablishmentRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
