using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;

namespace Backend.Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<ServiceResult<User>> CreateUserAsync(CreateUserDTO user);
        Task<ServiceResult<bool>> CreateNewCostumerUserAsync(CreateUserDTO user);
        Task<ServiceResult<LoginReponseDTO>> Login(LoginDTO user);
        Task<ServiceResult<PaginatedResult<User>>> AllDetails(FilterDTO filter);
        Task<ServiceResult<bool>> IsAuthenticated(long userId, Guid userToken);
        Task<ServiceResult<User>> GetUserById(long userId);
        Task<ServiceResult<User>> GetUserByEmail(string userEmail);
    }
}
