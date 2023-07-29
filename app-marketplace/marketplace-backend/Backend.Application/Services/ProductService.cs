using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Helpers.ServiceResultPattern;
using Backend.Infrastructure.Repository;

namespace Backend.Application.Services
{
    public class ProductService : IProductService
    {
        IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Product>>> AllPaginated(FilterDTO filter, User currentUser)
        {
            var products = await Product.ToBasic(_productRepository.Get(filter)).ToListAsync();

            var totalCount = products.Count();

            if (filter.Paging != null)
            {
                filter.Paging.Page = 0;

                totalCount = await _productRepository.Get(filter).CountAsync();
            }

            var result = new PaginatedResult<Product>
            {
                Items = products,
                TotalCount = totalCount
            };

            return new OkServiceResult<PaginatedResult<Product>>(result);
        }

        public async Task<ServiceResult<Product>> GetById(long profileId)
        {
            var product = await Product.ToBasic(_productRepository.GetByProperty("Id", profileId.ToString())).FirstOrDefaultAsync();

            if(product == null)
            {
                return new FailServiceResult<Product>("Produto não encontrado.");
            }

            var result = new OkServiceResult<Product>(product);

            return result;
        }
    
    }
}
