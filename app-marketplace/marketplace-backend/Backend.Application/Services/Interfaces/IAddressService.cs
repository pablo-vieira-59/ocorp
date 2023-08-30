using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IAddressService
    {
        Task<ServiceResult<PaginatedResult<Address>>> AllPaginated(FilterDTO filter, User currentUser);
    }
}
