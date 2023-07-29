using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IProductService
    {
        Task<ServiceResult<PaginatedResult<Product>>> AllPaginated(FilterDTO filter, User currentUser);
        Task<ServiceResult<Product>> GetById(long Id);
    }
}
