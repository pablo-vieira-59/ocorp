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
    public class SupplierService : ISupplierService
    {
        ISupplierRepository _supplierRepository;

        public SupplierService(ISupplierRepository supplierRepository)
        {
            _supplierRepository = supplierRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Supplier>>> AllPaginated(FilterDTO filter, User currentUser)
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

            var brands = await Supplier.ToBasic(_supplierRepository.Get(filter)).ToListAsync();

            var totalCount = brands.Count();

            if (filter.Paging != null)
            {
                filter.Paging.Page = 0;

                totalCount = await _supplierRepository.Get(filter).CountAsync();
            }

            var result = new PaginatedResult<Supplier>
            {
                Items = brands,
                TotalCount = totalCount
            };

            return new OkServiceResult<PaginatedResult<Supplier>>(result);
        }

        public async Task<ServiceResult<Supplier>> GetById(long id)
        {
            var product = await Supplier.ToBasic(_supplierRepository.GetByProperty("Id", id.ToString())).FirstOrDefaultAsync();

            if(product == null)
            {
                return new FailServiceResult<Supplier>("Fornecedor não encontrado.");
            }

            var result = new OkServiceResult<Supplier>(product);

            return result;
        }
    
        public async Task<ServiceResult<bool>> Create(SupplierCreateDTO request, User currentUser)
        {
            var existing = await _supplierRepository.GetByProperty("DocumentNumber", request.DocumentNumber).FirstOrDefaultAsync();

            if(existing != null)
            {
                return new FailServiceResult<bool>("CNPJ do Fornecedor já está cadastrado.");
            }

            var supplier = new Supplier
            {
                DocumentNumber = request.DocumentNumber,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                ClientId = currentUser.ClientId,
                FantasyName = request.FantasyName,
            };

            await _supplierRepository.AddAsync(supplier);

            return new OkServiceResult<bool>(true);
        }

        public async Task<ServiceResult<bool>> Edit(SupplierEditDTO request, User currentUser)
        {
            var existing = await _supplierRepository.GetByProperty("Id", request.Id.ToString()).FirstOrDefaultAsync();

            if (existing == null)
            {
                return new FailServiceResult<bool>("Fornecedor não encontrado.");
            }

            existing.FantasyName = request.FantasyName;
            existing.PhoneNumber = request.PhoneNumber;
            existing.Email = request.Email;

            await _supplierRepository.UpdateAsync(existing);

            return new OkServiceResult<bool>(true);
        }
    }
}
