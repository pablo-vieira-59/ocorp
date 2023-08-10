using Backend.Domain.DTO;
using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace Backend.Application.Services.Interfaces
{
    public interface IUserService
    {
        Task<ServiceResult<bool>> CreateUserAsync(UserCreateDTO user, User? currentUser);
        Task<ServiceResult<LoginReponseDTO>> Login(LoginDTO user);
        Task<ServiceResult<PaginatedResult<User>>> AllDetails(FilterDTO filter, User currentUser);
        Task<ServiceResult<bool>> IsAuthenticated(long userId, Guid userToken);
        Task<ServiceResult<User>> GetDetails(long id);
        Task<ServiceResult<User>> GetById(long id);
        Task<ServiceResult<bool>> EditUser(UserEditDTO request, User? currentUser);
        Task<ServiceResult<User>> GetCurrentUser(HttpContext context);
        Task<ServiceResult<User>> GetByGuid(string guid);
    }
}
