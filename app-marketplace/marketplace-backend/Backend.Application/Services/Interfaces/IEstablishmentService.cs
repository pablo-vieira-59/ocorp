using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IEstablishmentService
    {
        Task<ServiceResult<PaginatedResult<Establishment>>> AllDetails(FilterDTO filter, long userId);

        Task<ServiceResult<bool>> AddEstablishment(CreateEstablishmentDTO establishmentDTO);

        Task<ServiceResult<List<Establishment>>> GetAllAvailableToRegister(User user);

        Task<ServiceResult<List<Establishment>>> GetUserEstablishments(long userId);
    }
}
