﻿using Backend.Domain.Helpers;
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
        IPermissionRepository _permissionRepository;

        public EstablishmentService(IEstablishmentRepository establishmentRepository, IUserRepository userRepository, IPermissionRepository permissionRepository)
        {
            _establishmentRepository = establishmentRepository;
            _userRepository = userRepository;
            _permissionRepository = permissionRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Establishment>>> AllDetails(FilterDTO filter, User currentUser)
        {
            if(filter.SearchFields == null)
            {
                filter.SearchFields = new List<SearchField>();
            }

            if(currentUser.ProfileId != (int)ProfileEnum.Admin)
            {
                filter.SearchFields.Add(new SearchField
                {
                    Property = "ClientId",
                    Value = currentUser.ClientId.ToString(),
                });
            }
            
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
    
        public async Task<ServiceResult<bool>> AddEstablishment(CreateEstablishmentDTO establishmentDTO, User currentUser)
        {
            var userPermissions = await _permissionRepository.GetByUser(currentUser.Id).ToListAsync();

            if(!userPermissions.Select(x => x.Id).Contains((int)PermissionEnum.Cadastro_Estabelecimento))
            {
                return new FailServiceResult<bool>("Sem permissão para realizar ação.");
            }

            var query = _establishmentRepository.GetByProperty("DocumentNumber", establishmentDTO.DocumentNumber);

            var establishment = await query.Select(x => new Establishment { Id = x.Id }).FirstOrDefaultAsync();

            if(establishment != null)
            {
                return new FailServiceResult<bool>("CNPJ já cadastrado.");
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
                Url = establishmentDTO.Url,
                ClientId = currentUser.ClientId
            };

            var directors = await _userRepository.Get().Where(x => x.ClientId == currentUser.ClientId && x.ProfileId == (int)ProfileEnum.Diretor).ToListAsync();

            newEstablishment.User_Establishments = new List<User_Establishment>();
            foreach(var director in directors)
            {
                newEstablishment.User_Establishments.Add(new User_Establishment { UserId = director.Id });
            }

            await this._establishmentRepository.AddAsync(newEstablishment);

            return new OkServiceResult<bool>(true);
        }
    
        public async Task<ServiceResult<List<Establishment>>> GetClientEstablishments(long clientId)
        {
            var query = _establishmentRepository.GetClientEstablishments(clientId);

            var establishments = await Establishment.ToBasic(query).ToListAsync();

            return new OkServiceResult<List<Establishment>>(establishments);
        }

        public async Task<ServiceResult<List<Establishment>>> GetAll()
        {
            var query = _establishmentRepository.Get();

            var establishments = await Establishment.ToBasic(query).ToListAsync();

            return new OkServiceResult<List<Establishment>>(establishments);
        }

        public async Task<ServiceResult<List<Establishment>>> GetUserEstablishments(long userId)
        {
            var user = await _userRepository.GetByProperty("Id", userId.ToString()).FirstOrDefaultAsync();

            if(user == null)
            {
                return new FailServiceResult<List<Establishment>>("Usuário não encontrado.");
            }

            var query = _establishmentRepository.GetUserEstablishments(userId);

            var userEstablishments = await Establishment.ToBasic(query).ToListAsync();

            return new OkServiceResult<List<Establishment>>(userEstablishments);
        }

        
    }
}
