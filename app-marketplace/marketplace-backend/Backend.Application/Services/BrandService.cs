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
    public class BrandService : IBrandService
    {
        IBrandRepository _brandRepository;

        public BrandService(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Brand>>> AllPaginated(FilterDTO filter, User currentUser)
        {
            var brands = await Brand.ToBasic(_brandRepository.Get(filter)).ToListAsync();

            var totalCount = brands.Count();

            if (filter.Paging != null)
            {
                filter.Paging.Page = 0;

                totalCount = await _brandRepository.Get(filter).CountAsync();
            }

            var result = new PaginatedResult<Brand>
            {
                Items = brands,
                TotalCount = totalCount
            };

            return new OkServiceResult<PaginatedResult<Brand>>(result);
        }

        public async Task<ServiceResult<Brand>> GetById(long id)
        {
            var product = await Brand.ToBasic(_brandRepository.GetByProperty("Id", id.ToString())).FirstOrDefaultAsync();

            if(product == null)
            {
                return new FailServiceResult<Brand>("Produto não encontrado.");
            }

            var result = new OkServiceResult<Brand>(product);

            return result;
        }
    
        public async Task<ServiceResult<bool>> Create(BrandCreateDTO request, User currentUser)
        {
            var brand = new Brand
            {
                Name = request.Name,
                Description = request.Description,
                Color = request.Color,
                ClientId = currentUser.ClientId,
            };

            await _brandRepository.AddAsync(brand);

            return new OkServiceResultStruct<bool>(true);
        }

        public async Task<ServiceResult<bool>> Edit(BrandEditDTO request, User currentUser)
        {
            var brand = await _brandRepository.GetByProperty("Id", request.Id.ToString()).FirstOrDefaultAsync();

            if(brand == null)
            {
                return new FailServiceResultStruct<bool>("Marca não encontrada.");
            }

            brand.Color = request.Color;
            brand.Name = request.Name;
            brand.Description = request.Description;

            await _brandRepository.UpdateAsync(brand);

            return new OkServiceResultStruct<bool>(true);
        }

    }
}
