using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface ISupplierService
    {
        Task<ServiceResult<PaginatedResult<Supplier>>> AllPaginated(FilterDTO filter, User currentUser);
        Task<ServiceResult<Supplier>> GetById(long id);
        Task<ServiceResult<bool>> Create(SupplierCreateDTO request, User currentUser);
        Task<ServiceResult<bool>> Edit(SupplierEditDTO request, User currentUser);
    }
}
