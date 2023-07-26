using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using System.Data.Entity;

namespace Backend.Infrastructure.Repository
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
