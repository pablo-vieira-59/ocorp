using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IEstablishmentService
    {
        Task<ServiceResult<PaginatedResult<Establishment>>> AllDetails(FilterDTO filter, User currentUser);

        Task<ServiceResult<bool>> AddEstablishment(CreateEstablishmentDTO establishmentDTO, User currentUser);

        Task<ServiceResult<List<Establishment>>> GetClientEstablishments(long clientId);

        Task<ServiceResult<List<Establishment>>> GetUserEstablishments(long userId);
    }
}
