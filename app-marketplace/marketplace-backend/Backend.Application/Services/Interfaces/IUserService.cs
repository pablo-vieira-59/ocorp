using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<ServiceResult<bool>> CreateUserAsync(CreateUserDTO user, User? currentUser);
        Task<ServiceResult<LoginReponseDTO>> Login(LoginDTO user);
        Task<ServiceResult<PaginatedResult<User>>> AllDetails(FilterDTO filter);
        Task<ServiceResult<bool>> IsAuthenticated(long userId, Guid userToken);
        Task<ServiceResult<User>> GetDetails(long id);
        Task<ServiceResult<User>> GetById(long id);
    }
}
