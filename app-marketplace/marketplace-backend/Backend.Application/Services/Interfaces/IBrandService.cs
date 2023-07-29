using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IBrandService
    {
        Task<ServiceResult<PaginatedResult<Brand>>> AllPaginated(FilterDTO filter, User currentUser);
        Task<ServiceResult<Brand>> GetById(long id);
        Task<ServiceResult<bool>> Create(BrandCreateDTO request, User currentUser);
        Task<ServiceResult<bool>> Edit(BrandEditDTO request, User currentUser);
    }
}
