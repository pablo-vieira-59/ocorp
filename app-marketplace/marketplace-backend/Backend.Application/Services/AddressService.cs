using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Helpers.ServiceResultPattern;

namespace Backend.Application.Services
{
    public class AddressService : IAddressService
    {
        IAddressRepository _addressRepository;

        public AddressService(IAddressRepository addressRepository)
        {
            _addressRepository = addressRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Address>>> AllPaginated(FilterDTO filter, User currentUser)
        {
            if (filter.SearchFields == null)
            {
                filter.SearchFields = new List<SearchField>();
            }

            var address = new List<Address>();

            if (currentUser.ProfileId != (int)ProfileEnum.Admin)
            {
                //filter.SearchFields.Add(new SearchField
                //{
                //    Property = "ClientId",
                //    Value = currentUser.ClientId.ToString(),
                //});

                address = await Address.ToBasic(_addressRepository.GetClientAddresses(currentUser.ClientId, filter)).ToListAsync();
            }
            else
            {
                address = await Address.ToBasic(_addressRepository.Get(filter)).ToListAsync();
            }
            
            var totalCount = address.Count();

            if (filter.Paging != null)
            {
                filter.Paging.Page = 0;

                totalCount = await _addressRepository.Get(filter).CountAsync();
            }

            var result = new PaginatedResult<Address>
            {
                Items = address,
                TotalCount = totalCount
            };

            return new OkServiceResult<PaginatedResult<Address>>(result);
        }

        //public async Task<ServiceResult<Batch>> GetById(long id)
        //{
        //    var product = await Batch.ToBasic(_batchRepository.GetByProperty("Id", id.ToString())).FirstOrDefaultAsync();

        //    if(product == null)
        //    {
        //        return new FailServiceResult<Batch>("Produto não encontrado.");
        //    }

        //    var result = new OkServiceResult<Batch>(product);

        //    return result;
        //}
    
        //public async Task<ServiceResult<bool>> Create(BatchCreateDTO request, User currentUser)
        //{
        //    var existing = await _batchRepository.GetByProperty("Serial", request.Serial).FirstOrDefaultAsync();

        //    if (existing != null)
        //    {
        //        return new FailServiceResultStruct<bool>("Lote já cadastrado.");
        //    }

        //    var batch = new Batch
        //    {
        //        ClientId = currentUser.Id,
        //        AddressId = request.AddressId,
        //        BatchStatusId = request.BatchStatusId,
        //        ProductId = request.ProductId,
        //        Serial = request.Serial,
        //        Description = request.Description,
        //        TotalPrice = request.TotalPrice,
        //        UnitPrice = request.UnitPrice,
        //        TotalUnits = request.TotalUnits,
        //        FabricatedAt = request.FabricatedAt,
        //        ValidUntil = request.ValidUntil,
        //    };

        //    await _batchRepository.AddAsync(batch);

        //    return new OkServiceResultStruct<bool>(true);
        //}
    }
}
