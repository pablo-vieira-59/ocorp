using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IBatchService
    {
        Task<ServiceResult<PaginatedResult<Batch>>> AllPaginated(FilterDTO filter, User currentUser);
        Task<ServiceResult<Batch>> GetById(long id);
        Task<ServiceResult<bool>> Create(BatchCreateDTO request, User currentUser);
    }
}
