using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace Backend.Application.Services
{
    public class EstablishmentService : IEstablishmentService
    {
        IEstablishmentRepository _establishmentRepository;

        public EstablishmentService(IEstablishmentRepository establishmentRepository)
        {
            _establishmentRepository = establishmentRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Establishment>>> AllDetails(FilterDTO filter)
        {
            var establishments = await _establishmentRepository.Get(filter).Select(e => new Establishment
            {
                Id = e.Id,
                EstablishmentStatusId = e.EstablishmentStatusId,
                CorporateName = e.CorporateName,
                FantasyName = e.FantasyName,
                DocumentNumber = e.DocumentNumber,
                Email = e.Email,
                PhoneNumber = e.PhoneNumber,
                Url = e.Url,
                CreatedAt = e.CreatedAt,
            }).ToListAsync();

            var totalCount = establishments.Count();

            if(filter.Paging != null)
            {
                filter.Paging.Page = 0;

                totalCount = await _establishmentRepository.Get(filter).CountAsync();
            }

            var result = new PaginatedResult<Establishment>
            {
                Items = establishments,
                TotalCount = totalCount
            };

            return new OkServiceResult<PaginatedResult<Establishment>>(result);
        }
    
        public async Task<ServiceResult<bool>> AddEstablishment(CreateEstablishmentDTO establishmentDTO)
        {
            var query = await _establishmentRepository.GetByCNPJ(establishmentDTO.DocumentNumber);

            var establishment = await query.Select(x => new Establishment { Id = x.Id }).FirstOrDefaultAsync();

            if(establishment != null)
            {
                return new FailServiceResultStruct<bool>("CNPJ já cadastrado.");
            }

            var newEstablishment = new Establishment
            {
                CorporateName = establishmentDTO.CorporateName,
                FantasyName = establishmentDTO.FantasyName,
                CreatedAt = DateTime.Now,
                DocumentNumber = establishmentDTO.DocumentNumber,
                Email = establishmentDTO.Email,
                EstablishmentStatusId = (int)EstablishmentStatusEnum.Active,
                PhoneNumber = establishmentDTO.PhoneNumber,
                Url = establishmentDTO.Url
            };

            await this._establishmentRepository.AddAsync(newEstablishment);

            return new OkServiceResultStruct<bool>(true);
        }
    }
}
