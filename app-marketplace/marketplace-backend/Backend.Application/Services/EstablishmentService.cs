using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;

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
    }
}
