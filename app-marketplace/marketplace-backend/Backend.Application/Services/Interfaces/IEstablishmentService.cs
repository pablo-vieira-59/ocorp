using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IEstablishmentService
    {
        Task<ServiceResult<PaginatedResult<Establishment>>> AllDetails(FilterDTO filter);

        Task<ServiceResult<bool>> AddEstablishment(CreateEstablishmentDTO establishmentDTO);
    }
}
