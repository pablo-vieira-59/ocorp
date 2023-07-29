using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using System.Data.Entity;

namespace Backend.Infrastructure.Repository
{
    public class SupplierRepository : BaseRepository<Supplier>, ISupplierRepository
    {
        public SupplierRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
