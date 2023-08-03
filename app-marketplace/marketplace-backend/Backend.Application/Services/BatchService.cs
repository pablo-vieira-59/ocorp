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
    public class BatchService : IBatchService
    {
        IBatchRepository _batchRepository;

        public BatchService(IBatchRepository batchRepository)
        {
            _batchRepository = batchRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Batch>>> AllPaginated(FilterDTO filter, User currentUser)
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

            var batches = await Batch.ToBasic(_batchRepository.Get(filter)).ToListAsync();

            var totalCount = batches.Count();

            if (filter.Paging != null)
            {
                filter.Paging.Page = 0;

                totalCount = await _batchRepository.Get(filter).CountAsync();
            }

            var result = new PaginatedResult<Batch>
            {
                Items = batches,
                TotalCount = totalCount
            };

            return new OkServiceResult<PaginatedResult<Batch>>(result);
        }

        public async Task<ServiceResult<Batch>> GetById(long id)
        {
            var product = await Batch.ToBasic(_batchRepository.GetByProperty("Id", id.ToString())).FirstOrDefaultAsync();

            if(product == null)
            {
                return new FailServiceResult<Batch>("Produto não encontrado.");
            }

            var result = new OkServiceResult<Batch>(product);

            return result;
        }
    
        public async Task<ServiceResult<bool>> Create(BatchCreateDTO request, User currentUser)
        {
            var existing = await _batchRepository.GetByProperty("Serial", request.Serial).FirstOrDefaultAsync();

            if (existing != null)
            {
                return new FailServiceResultStruct<bool>("Lote já cadastrado.");
            }

            var batch = new Batch
            {
                ClientId = currentUser.Id,
                AddressId = request.AddressId,
                BatchStatusId = request.BatchStatusId,
                ProductId = request.ProductId,
                Serial = request.Serial,
                Description = request.Description,
                TotalPrice = request.TotalPrice,
                UnitPrice = request.UnitPrice,
                TotalUnits = request.TotalUnits,
                FabricatedAt = request.FabricatedAt,
                ValidUntil = request.ValidUntil,
            };

            await _batchRepository.AddAsync(batch);

            return new OkServiceResultStruct<bool>(true);
        }
    }
}
