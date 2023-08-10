using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;

namespace Backend.Infrastructure.Repository
{
    public class SupplierRepository : BaseRepository<Supplier>, ISupplierRepository
    {
        public SupplierRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
