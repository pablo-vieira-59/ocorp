using Backend.Domain.DTO;
using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;

namespace Backend.Infrastructure.Repository
{
    public class AddressRepository : BaseRepository<Address>, IAddressRepository
    {
        public AddressRepository(Context.AppContext context) : base(context)
        {

        }

        public IQueryable<Address> GetClientAddresses(long clientId, FilterDTO? filter = null)
        {
            var query = _context.Address
                .Where(x => x.Address_Establishments!.Any(z => z.Establishment!.ClientId == clientId))
                .AsQueryable();

            var result = GetFromQuery(query, filter);

            return result;
        }
    }
}
