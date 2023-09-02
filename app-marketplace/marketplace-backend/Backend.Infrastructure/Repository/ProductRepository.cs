using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;

namespace Backend.Infrastructure.Repository
{
    public class ProductRepository : BaseRepository<Product>, IProductRepository
    {
        public ProductRepository(Context.AppContext context) : base(context)
        {

        }

        public bool CreateProduct(Product product, List<Brand_Product> brand_Product)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    _context.Add(product);
                    _context.SaveChanges();

                    foreach (var item in brand_Product)
                    {
                        item.ProductId = product.Id;
                    }

                    _context.AddRange(brand_Product);
                    _context.SaveChanges();

                    transaction.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    transaction.Rollback();
                    return false;
                }
            }
        }
    }
}
