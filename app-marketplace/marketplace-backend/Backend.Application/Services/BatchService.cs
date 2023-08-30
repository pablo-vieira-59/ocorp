using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Helpers.ServiceResultPattern;

namespace Backend.Application.Services
{
    public class BatchService : IBatchService
    {
        IBatchRepository _batchRepository;
        IProductRepository _productRepository;

        public BatchService(IBatchRepository batchRepository, IProductRepository productRepository)
        {
            _batchRepository = batchRepository;
            _productRepository = productRepository;
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

            var batches = await _batchRepository.Get(filter).Select(x => new Batch
            {
                Id = x.Id,
                FabricatedAt = x.FabricatedAt,
                OrderedAt = x.OrderedAt,
                BatchStatus = x.BatchStatus,
                Product = new Product { Name = x.Product!.Name},
                Address = new Address { ZipCode = x.Address!.ZipCode},
                TotalPrice = x.TotalPrice,
                TotalUnits = x.TotalUnits,
            }).ToListAsync();

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

            var totalPrice = (request.UnitPrice * request.TotalUnits) + request.FreightPrice;

            var batch = new Batch
            {
                ClientId = currentUser.ClientId,
                AddressId = request.AddressId,
                BatchStatusId = (int)BatchStatusEnum.EmTransito,
                ProductId = request.ProductId,
                SupplierId = request.SupplierId,
                Serial = request.Serial,
                Description = "",
                TotalPrice = totalPrice,
                UnitPrice = request.UnitPrice,
                FreightPrice = request.FreightPrice,
                TotalUnits = request.TotalUnits,
                FabricatedAt = request.FabricatedAt,
                ValidUntil = request.ValidUntil,
                InvoiceImageGuid = request.InvoiceImageGuid,
                PaymentProofImageGuid = request.PaymentProofImageGuid,
                OrderedAt = DateTime.Now
            };

            batch.BatchHistory = new List<BatchHistory>
            {
                new BatchHistory
                {
                    Batch = batch,
                    BatchStatusIdFrom = (int)BatchStatusEnum.EmTransito,
                    BatchStatusIdTo = (int)BatchStatusEnum.EmTransito,
                    CreatedAt = DateTime.Now,
                    UserId = currentUser.Id,
                    Message = "Lote criado."
                }
            };

            await _batchRepository.AddAsync(batch);

            return new OkServiceResultStruct<bool>(true);
        }

        public async Task<ServiceResult<bool>> Edit(BatchChangeStatusDTO request, User currentUser)
        {
            var batch = await _batchRepository.GetByProperty("Id", request.BatchId.ToString()).FirstOrDefaultAsync();

            if (batch == null)
            {
                return new FailServiceResultStruct<bool>("Lote não encontrado.");
            }

            var product = await _productRepository.GetByProperty("Id",batch.ProductId.ToString()).FirstOrDefaultAsync();
            if (product == null)
            {
                return new FailServiceResultStruct<bool>("Produto não encontrado.");
            }

            var history = new BatchHistory
            {
                BatchId = request.BatchId,
                BatchStatusIdFrom = batch.BatchStatusId,
                BatchStatusIdTo = request.BatchStatusId,
                CreatedAt = DateTime.UtcNow,
                UserId = currentUser.Id,
                Message = $"Lote alterado de Status por : {currentUser.Name}."
            };

            switch ((BatchStatusEnum)request.BatchStatusId)
            {
                case BatchStatusEnum.EmTransito:
                    if (batch.BatchStatusId == (int)BatchStatusEnum.EmEstoque)
                    {
                        product!.Units -= batch.TotalUnits;
                        history.Message += $"\n{batch.TotalUnits} unidades removidas do estoque.";
                    }
                    break;
                case BatchStatusEnum.EmEstoque:
                    if (batch.BatchStatusId != (int)BatchStatusEnum.EmEstoque)
                    {
                        product!.Units += batch.TotalUnits;
                        history.Message += $"\n{batch.TotalUnits} unidades adicionadas ao estoque.";
                    }
                    break;
                case BatchStatusEnum.Cancelado:
                    if (batch.BatchStatusId == (int)BatchStatusEnum.EmEstoque)
                    {
                        product!.Units -= batch.TotalUnits;
                        history.Message += $"\n{batch.TotalUnits} unidades removidas do estoque.";
                    }
                    break;

                default:
                    return new FailServiceResultStruct<bool>("Status não encontrado.");
            }

            if(request.Message != null)
            {
                history.Message += "\n" + request.Message; 
            }

            batch.BatchStatusId = request.BatchStatusId;

            var result = _batchRepository.ChangeStatus(batch, product, history);

            if (result)
            {
                return new OkServiceResultStruct<bool>(true);
            }

            return new FailServiceResultStruct<bool>("Falha ao alterar lote.");
        }
    
        public async Task<ServiceResult<List<BatchStatus>>> GetStatusList()
        {
            var status = await _batchRepository.GetStatusList();

            return new OkServiceResult<List<BatchStatus>>(status);
        }
    }
}
