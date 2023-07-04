using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.DynamicLinq;

namespace Backend.Application.Services
{
    public class UserService : IUserService
    {
        IUserRepository _userRepository;
        IUserAccessRepository _userAccessRepository;

        public UserService(IUserRepository userRepository, IUserAccessRepository userAccessRepository)
        {
            _userRepository = userRepository;
            _userAccessRepository = userAccessRepository;
        }

        public async Task<ServiceResult<User>> CreateUserAsync(CreateUserDTO user)
        {
            //var hasUser = await (_userRepository.GetByUsernameAsync(user.UserName)) != null;

            //if (hasUser)
            //{
            //    return new FailServiceResult<User>("Usuario Existente.", new List<string>());
            //}

            //UserAccess userAccess = new UserAccess
            //{
            //    Token = Guid.NewGuid(),
            //    TokenValidUntil = DateTime.Now.AddHours(8).ToUniversalTime(),
            //};

            //User newUser = new User
            //{
            //    CreatedAt = DateTime.Now.ToUniversalTime(),
            //    Name = user.Name,
            //    Email = user.Email,
            //    DocumentNumber = user.DocumentNumber,
            //    Password = user.Password,
            //    PhoneNumber = user.PhoneNumber,
            //    ProfileId = 4,
            //    Username = user.UserName,
            //    UserAccess = userAccess
            //};

            //newUser = await _userRepository.AddAsync(newUser);

            //return new OkServiceResult<User>(newUser);
            await Task.CompletedTask;
            return new OkServiceResult<User>(new User());
        }

        public async Task<ServiceResult<PaginatedResult<User>>> AllDetails(FilterDTO filter)
        {
            var users = await _userRepository.Get(filter).Select(e => new User
            {
                Id = e.Id,
                Username = e.Username,
                Name = e.Name,
                Email = e.Email,
                DocumentNumber = e.DocumentNumber,
                PhoneNumber = e.PhoneNumber,
                CreatedAt = e.CreatedAt,
                ProfileId = e.ProfileId,
                Profile = new Profile { Name = e.Profile.Name },
            }).ToListAsync();

            var total = users.Count();

            if(filter.Paging != null)
            {
                filter.Paging.Page = 0;

                total = await _userRepository.Get(filter).CountAsync();
            }
            
            var result = new PaginatedResult<User>
            {
                TotalCount = total,
                Items = users,
            };

            return new OkServiceResult<PaginatedResult<User>>(result);
        }

        public async Task<ServiceResult<LoginReponseDTO>> Login(LoginDTO loginData)
        {
            var dbUser = await _userRepository.GetByUsername(loginData.Username)
                .Include(x => x.UserAccess)
                .FirstOrDefaultAsync();

            if (dbUser == null)
            {
                return new FailServiceResult<LoginReponseDTO>("Usuario não encontrado.");
            }

            if (dbUser.Password != loginData.Password)
            {
                return new FailServiceResult<LoginReponseDTO>("Senha incorreta.");
            }

            if (dbUser.UserAccess == null)
            {
                dbUser.UserAccess = new UserAccess { 
                    Token = Guid.NewGuid(),
                    TokenValidUntil = DateTime.UtcNow.AddHours(8),
                    UserId = dbUser.Id,
                };
            }
            else
            {
                dbUser.UserAccess.Token = Guid.NewGuid();
                dbUser.UserAccess.TokenValidUntil = DateTime.UtcNow.AddHours(8);
            }

            dbUser.LastLogin = DateTime.UtcNow;

            await _userRepository.UpdateAsync(dbUser);

            dbUser.UserAccess.User = null;

            var tokenJson = JsonSerializer.Serialize(dbUser.UserAccess);

            var tokenCrypt = EncryptionHelper.Encrypt(tokenJson);

            var result = new LoginReponseDTO
            {
                Token = tokenCrypt,
                Guid = dbUser.Guid.ToString(),
            };

            return new OkServiceResult<LoginReponseDTO>(result);
        }
        
        public async Task<ServiceResult<bool>> IsAuthenticated(long userId, Guid userToken)
        {
            var userAccess = await _userAccessRepository.GetByUserIdAsync(userId);

            if (userAccess == null) 
            {
                return new FailServiceResultStruct<bool>("Usuário não encontrado.");
            }

            if (userAccess.Token != userToken)
            {
                return new FailServiceResultStruct<bool>("Token inválido.");
            }

            if(userAccess.TokenValidUntil < DateTime.UtcNow)
            {
                return new FailServiceResultStruct<bool>("Token expirado.");
            }

            return new OkServiceResultStruct<bool>(true);
        }

        public async Task<ServiceResult<User>> GetUserById(long userId)
        {
            var filter = new FilterDTO();

            var searchFilter = new SearchField { Property = "Id", Value = userId.ToString() };

            filter.SearchFields?.Add(searchFilter);

            var user = await _userRepository.Get(filter).FirstOrDefaultAsync();

            if(user == null)
            {
                return new FailServiceResult<User>("Usuário não encontrado.");
            }

            return new OkServiceResult<User>(user);
        }

        public Task<ServiceResult<User>> GetUserByEmail(string userEmail)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResult<bool>> CreateNewCostumerUserAsync(CreateUserDTO request)
        {
            var hasUser = (await _userRepository.GetByUsername(request.Email).FirstOrDefaultAsync()) != null;

            if (hasUser)
            {
                return new FailServiceResultStruct<bool>("Usuario Existente.");
            }

            var newUser = new User
            {
                Username = request.Email,
                Password = request.Password,
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                DocumentNumber = request.DocumentNumber,
                CreatedAt = DateTime.Now,
                ProfileId = (int)ProfileEnum.Costumer,
                UserStatusId = (int)UserStatusEnum.Active,
                LastLogin = DateTime.Now,
                Guid = Guid.NewGuid(),
            };

            UserAccess userAccess = new UserAccess
            {
                Token = Guid.NewGuid(),
                TokenValidUntil = DateTime.Now.AddHours(8),
            };

            newUser.UserAccess = userAccess;

            if (!request.HasAddress)
            {
                var address = new Address
                {
                    AddressName = request.AddressName,
                    City = request.City,
                    Country = "Brasil",
                    Neighborhood = request.Neighborhood,
                    Number = request.Number.ToString(),
                    State = request.State,
                    ZipCode = request.ZipCode.ToString(),
                };

                var addressUser = new Address_User
                {
                    Address = address,
                    User = newUser
                };

                newUser.Address_Users = new List<Address_User> { addressUser };
            }

            await _userRepository.AddAsync(newUser);

            return new OkServiceResultStruct<bool>(true);
        }
    }
}
