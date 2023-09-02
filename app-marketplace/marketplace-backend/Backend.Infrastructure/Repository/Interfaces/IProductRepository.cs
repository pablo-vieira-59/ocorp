using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product>
    {
        public bool CreateProduct(Product product, List<Brand_Product> brand_Product);
    }
}
