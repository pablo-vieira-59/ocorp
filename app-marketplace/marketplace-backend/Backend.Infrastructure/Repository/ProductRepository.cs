using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;

namespace Backend.Infrastructure.Repository
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
