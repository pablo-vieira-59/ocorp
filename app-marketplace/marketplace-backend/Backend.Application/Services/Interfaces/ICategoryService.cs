using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<ServiceResult<PaginatedResult<Category>>> AllPaginated(FilterDTO filter, User currentUser);
        Task<ServiceResult<Category>> GetById(long id);
        Task<ServiceResult<bool>> Create(CategoryCreateDTO request, User currentUser);
        Task<ServiceResult<bool>> Edit(CategoryEditDTO request, User currentUser);
    }
}
