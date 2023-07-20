using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using Backend.Domain.Helpers.ServiceResultPattern;

namespace Backend.Application.Services
{
    public class EstablishmentService : IEstablishmentService
    {
        IEstablishmentRepository _establishmentRepository;
        IUserRepository _userRepository;

        public EstablishmentService(IEstablishmentRepository establishmentRepository, IUserRepository userRepository)
        {
            _establishmentRepository = establishmentRepository;
            _userRepository = userRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Establishment>>> AllDetails(FilterDTO filter, long userId)
        {
            filter.SearchFields!.Add(new SearchField
            {
                Property = "User_Establishments.UserId",
                Operator = "any",
                Value = userId.ToString(),
            });

            var establishments = await _establishmentRepository.Get(filter).Select(e => new Establishment
            {
                Id = e.Id,
                EstablishmentStatusId = e.EstablishmentStatusId,
                CorporateName = e.CorporateName,
                FantasyName = e.FantasyName,
                DocumentNumber = e.DocumentNumber,
                Email = e.Email,
                PhoneNumber = e.PhoneNumber,
                Url = e.Url,
                CreatedAt = e.CreatedAt,
            }).ToListAsync();

            var totalCount = establishments.Count();

            if(filter.Paging != null)
            {
                filter.Paging.Page = 0;

                totalCount = await _establishmentRepository.Get(filter).CountAsync();
            }

            var result = new PaginatedResult<Establishment>
            {
                Items = establishments,
                TotalCount = totalCount
            };

            return new OkServiceResult<PaginatedResult<Establishment>>(result);
        }
    
        public async Task<ServiceResult<bool>> AddEstablishment(CreateEstablishmentDTO establishmentDTO)
        {
            var query = _establishmentRepository.GetByProperty("DocumentNumber", establishmentDTO.DocumentNumber);

            var establishment = await query.Select(x => new Establishment { Id = x.Id }).FirstOrDefaultAsync();

            if(establishment != null)
            {
                return new FailServiceResultStruct<bool>("CNPJ já cadastrado.");
            }

            var newEstablishment = new Establishment
            {
                CorporateName = establishmentDTO.CorporateName,
                FantasyName = establishmentDTO.FantasyName,
                CreatedAt = DateTime.Now,
                DocumentNumber = establishmentDTO.DocumentNumber,
                Email = establishmentDTO.Email,
                EstablishmentStatusId = (int)EstablishmentStatusEnum.Active,
                PhoneNumber = establishmentDTO.PhoneNumber,
                Url = establishmentDTO.Url
            };

            await this._establishmentRepository.AddAsync(newEstablishment);

            return new OkServiceResultStruct<bool>(true);
        }
    
        public async Task<ServiceResult<List<Establishment>>> GetAllAvailableToRegister(User user)
        {
            var query = _establishmentRepository.GetAllAvailableToRegister(user.Id);

            var establishments = await ToBasicEntity(query).ToListAsync();

            return new OkServiceResult<List<Establishment>>(establishments);
        }

        public async Task<ServiceResult<List<Establishment>>> GetAll()
        {
            var query = _establishmentRepository.Get();

            var establishments = await ToBasicEntity(query).ToListAsync();

            return new OkServiceResult<List<Establishment>>(establishments);
        }

        public async Task<ServiceResult<List<Establishment>>> GetUserEstablishments(long userId)
        {
            var user = await _userRepository.GetByProperty("Id", userId.ToString()).FirstOrDefaultAsync();

            if(user == null)
            {
                return new FailServiceResult<List<Establishment>>("Usuário não encontrado.");
            }

            return await GetAllAvailableToRegister(user);
        }

        private IQueryable<Establishment> ToBasicEntity(IQueryable<Establishment> query)
        {
            return query.Select(e => new Establishment
            {
                Id = e.Id,
                EstablishmentStatusId = e.EstablishmentStatusId,
                CorporateName = e.CorporateName,
                FantasyName = e.FantasyName,
                DocumentNumber = e.DocumentNumber,
                Email = e.Email,
                PhoneNumber = e.PhoneNumber,
                Url = e.Url,
                CreatedAt = e.CreatedAt,
            });
        }
    }
}
