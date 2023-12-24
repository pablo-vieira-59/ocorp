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
            if (filter.SearchFields == null)
            {
                filter.SearchFields = new List<SearchField>();
            }

            if (currentUser.ProfileId != (int)ProfileEnum.Admin)
            {
                filter.SearchFields.Add(new SearchField
                {
                    Property = "ClientId",
                    Value = currentUser.ClientId.ToString(),
                });
            }

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

        public async Task<ServiceResult<bool>> Create(ProductCreateDTO request, User currentUser)
        {
            var existing = await _productRepository.GetByProperty("Name", request.Name).FirstOrDefaultAsync();

            if (existing != null)
            {
                return new FailServiceResult<bool>("Produto com mesmo nome já cadastrado.");
            }

            

            var product = new Product
            {
                Name = request.Name,
                Description = request.Description == null ? "" : request.Description,
                ClientId = currentUser.ClientId,
                ImageGuid = new Guid(request.ImageGuid),
                SubCategoryId = request.SubcategoryId,
                Price = request.Price,
                CreatedAt = DateTime.UtcNow,
                Units = 0,
            };

            var brands = new List<Brand_Product>();
            foreach (var item in request.BrandIds)
            {
                brands.Add(new Brand_Product
                {
                    BrandId = item,
                    Product = product
                });
            }

            _productRepository.CreateProduct(product, brands);

            return new OkServiceResult<bool>(true);
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
