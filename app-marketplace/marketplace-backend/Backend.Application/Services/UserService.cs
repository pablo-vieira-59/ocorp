using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using Microsoft.EntityFrameworkCore.DynamicLinq;
using Backend.Domain.Helpers.ServiceResultPattern;
using Microsoft.AspNetCore.Http;
using System.Runtime.ConstrainedExecution;

namespace Backend.Application.Services
{
    public class UserService : IUserService
    {
        IUserRepository _userRepository;
        IPermissionRepository _permissionRepository;
        IUserAccessRepository _userAccessRepository;
        IEstablishmentRepository _establishmentRepository;

        public UserService(IUserRepository userRepository, IUserAccessRepository userAccessRepository, IPermissionRepository permissionRepository, IEstablishmentRepository establishmentRepository)
        {
            _userRepository = userRepository;
            _userAccessRepository = userAccessRepository;
            _permissionRepository = permissionRepository;
            _establishmentRepository = establishmentRepository;
        }

        public async Task<ServiceResult<PaginatedResult<User>>> AllDetails(FilterDTO filter, User currentUser)
        {
            if(filter.SearchFields == null)
            {
                filter.SearchFields = new List<SearchField>();
            }

            if(currentUser.ProfileId != (int)ProfileEnum.Admin)
            {
                filter.SearchFields.Add(new SearchField { Property = "ClientId", Value = currentUser.ClientId.ToString() });
            }
            
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
                Password = e.Password,
                Profile = new Profile { Name = e.Profile!.Name },
                ClientId = e.ClientId,
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
            var dbUser = await _userRepository.GetByProperty("Username", loginData.Username)
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
                Guid = dbUser.Guid.ToString()!,
            };

            return new OkServiceResult<LoginReponseDTO>(result);
        }
        
        public async Task<ServiceResult<bool>> IsAuthenticated(long userId, Guid userToken)
        {
            var userAccess = await _userAccessRepository.GetByProperty("UserId", userId.ToString()).FirstOrDefaultAsync();

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

        public async Task<ServiceResult<bool>> CreateUserAsync(UserCreateDTO request, User? currentUser)
        {
            var hasUser = (await _userRepository.GetByProperty("Username", request.Email).FirstOrDefaultAsync()) != null;

            // Valida nome de usuário
            if (hasUser)
            {
                return new FailServiceResultStruct<bool>("Usuario Existente.");
            }
            
            // Valida CPF
            hasUser = (await _userRepository.GetByProperty("DocumentNumber", request.DocumentNumber).FirstOrDefaultAsync()) != null;
            if (hasUser)
            {
                return new FailServiceResultStruct<bool>("CPF já cadastrado.");
            }

            // Valida permissão de Perfil
            if (!request.IsNewClient)
            {
                var hasPermission = await this.CheckProfilePermission(request.ProfileId, currentUser);
                if (!hasPermission)
                {
                    return new FailServiceResultStruct<bool>("Sem permissão para realizar essa ação.");
                }
            }
            
            DateTime birthDay;
            var isDateValid = DateTime.TryParseExact(request.BirthdayDate, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AdjustToUniversal, out birthDay);
            if (!isDateValid)
            {
                return new FailServiceResultStruct<bool>("Data inválida.");
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
                ProfileId = request.ProfileId,
                UserStatusId = (int)UserStatusEnum.Active,
                LastLogin = DateTime.Now,
                BirthdayDate = birthDay,
                Guid = Guid.NewGuid(),
            };

            if(request.IsNewClient)
            {
                newUser.Client = new Client();
                newUser.ProfileId = (int)ProfileEnum.Diretor;
            }
            else
            {
                newUser.ClientId = currentUser!.ClientId;
            }

            var userAccess = new UserAccess
            {
                Token = Guid.NewGuid(),
                TokenValidUntil = DateTime.Now.AddHours(8),
            };

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

            newUser.UserAccess = userAccess;
            newUser.Address_Users = new List<Address_User> { addressUser };

            await _userRepository.AddAsync(newUser);

            return new OkServiceResultStruct<bool>(true);
        }

        public async Task<ServiceResult<User>> GetDetails(long id)
        {
            await Task.CompletedTask;
            return new FailServiceResult<User>("Não implementado.");
        }

        public async Task<ServiceResult<User>> GetById(long id)
        {
            var query = _userRepository.GetByProperty("Id", id.ToString());

            var result = await ToBasicEntity(query).FirstOrDefaultAsync();

            if (result == null) return new FailServiceResult<User>("Usuario não encontrado.");

            return new OkServiceResult<User>(result);
        }
    
        public async Task<ServiceResult<bool>> HasPermission(long userId, PermissionEnum permission)
        {
            var query = _permissionRepository.GetByUser(userId);
            var permissions = await query.Select(x => x.Id).ToListAsync();

            if(permissions.Contains((int)permission))
            {
                return new OkServiceResultStruct<bool>(true);
            }

            return new OkServiceResultStruct<bool>(false);
        }
    
        public async Task<ServiceResult<bool>> EditUser(UserEditDTO request, User? currentUser)
        {
            var hasPermission = await CheckProfilePermission(request.ProfileId, currentUser);

            if(!hasPermission)
            {
                return new FailServiceResultStruct<bool>("Sem permissão para realizar essa ação.");
            }

            var user = await _userRepository.GetByProperty("Id", request.Id.ToString()).FirstOrDefaultAsync();

            if(user == null)
            {
                return new FailServiceResultStruct<bool>("Usuário não encontrado.");
            }

            DateTime birthDay;
            var isDateValid = DateTime.TryParseExact(request.BirthdayDate, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture, System.Globalization.DateTimeStyles.AdjustToUniversal, out birthDay);
            if (!isDateValid)
            {
                return new FailServiceResultStruct<bool>("Data inválida.");
            }

            user.Name = request.Name;
            user.PhoneNumber = request.PhoneNumber;
            user.Password = request.Password;
            user.ProfileId = request.ProfileId;
            user.BirthdayDate = birthDay;

            var selectedEstablishmentsId = request.UserEstablishments!.Select(x => x.Id).ToList();
            var currentEstablishmentsIds = _establishmentRepository.GetUserEstablishments(request.Id).Select(x => x.Id);

            var establishmentsToAdd = selectedEstablishmentsId.Where(x => !currentEstablishmentsIds.Contains(x)).ToList();
            var establishmentsToRemove = currentEstablishmentsIds.Where(x => !selectedEstablishmentsId.Contains(x)).ToList();

            await _userRepository.EditUser(user, establishmentsToAdd, establishmentsToRemove);

            return new OkServiceResultStruct<bool>(true);
        }

        private async Task<bool> CheckProfilePermission(int profileId, User? currentUser)
        {
            // Caso não seja cadastro de usuário comum
            if (profileId != 4)
            {
                // Caso a requisição não seja de um usuário logado
                if (currentUser == null)
                {
                    return false;
                }

                // Verifica permissão de cadastro
                PermissionEnum permissionId = PermissionEnum.Cadastro_Funcionario;
                switch (profileId)
                {
                    case 1: // Admin
                        permissionId = PermissionEnum.Cadastro_Admin;
                        break;
                    case 2: // Gerente
                        permissionId = PermissionEnum.Cadastro_Gerente;
                        break;
                    case 3: // Funcionario
                        permissionId = PermissionEnum.Cadastro_Funcionario;
                        break;
                    case 5: // Supervisor
                        permissionId = PermissionEnum.Cadastro_Supervisor;
                        break;
                    default:
                        break;
                }

                var hasPermission = (await HasPermission(currentUser.Id, permissionId)).Value;

                if (!hasPermission)
                {
                    return false;
                }
            }

            return true;
        }

        public async Task<ServiceResult<User>> GetCurrentUser(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token == null || token == "null")
            {
                return new FailServiceResult<User>("Usuário não encontrado");
            }

            var tokenDecrypt = EncryptionHelper.Decrypt(token);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };

            var userAuth = JsonSerializer.Deserialize<UserAccess>(tokenDecrypt, options);

            if (userAuth != null)
            {
                return await GetById(userAuth.UserId);
            }

            return new FailServiceResult<User>("Usuário não encontrado");
        }
    
        private IQueryable<User> ToBasicEntity(IQueryable<User> query) 
        {
            var result = query.Select(e => new User
            {
                Email = e.Email,
                CreatedAt = e.CreatedAt,
                DocumentNumber = e.DocumentNumber,
                Guid = e.Guid,
                Id = e.Id,
                Name = e.Name,
                LastLogin = e.LastLogin,
                Password = e.Password,
                PhoneNumber = e.PhoneNumber,
                ProfileId = e.ProfileId,
                Username = e.Username,
                UserStatusId = e.UserStatusId,
                BirthdayDate = e.BirthdayDate,
                ClientId = e.ClientId,
            });

            return result;
        }
    }
}
