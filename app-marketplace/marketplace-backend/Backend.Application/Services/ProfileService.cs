using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using Backend.Domain.Helpers.ServiceResultPattern;
using Backend.Infrastructure.Repository;

namespace Backend.Application.Services
{
    public class ProfileService : IProfileService
    {
        IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public async Task<ServiceResult<PaginatedResult<Profile>>> AllDetails(FilterDTO filter)
        {
            var profiles = await _profileRepository.Get(filter).Select(e => new Profile
            {
                Id = e.Id,
                Name = e.Name,
            }).ToListAsync();

            var totalCount = profiles.Count();

            if (filter.Paging != null)
            {
                filter.Paging.Page = 0;

                totalCount = await _profileRepository.Get(filter).CountAsync();
            }

            var result = new PaginatedResult<Profile>
            {
                Items = profiles,
                TotalCount = totalCount
            };

            return new OkServiceResult<PaginatedResult<Profile>>(result);
        }

        public async Task<ServiceResult<List<Profile>>> GetAll()
        {
            var filter = new FilterDTO();

            var profiles = await _profileRepository.Get().Select(e => new Profile
            {
                Id=e.Id,
                Name=e.Name,
            }).ToListAsync();

            var result = new OkServiceResult<List<Profile>>(profiles);

            return result;
        }

        public async Task<ServiceResult<Profile>> GetById(int profileId)
        {
            var profile = await _profileRepository.GetByProperty("Id", profileId.ToString()).Select(e => new Profile
            {
                Id = e.Id,
                Name = e.Name,
            }).FirstOrDefaultAsync();

            if(profile == null)
            {
                return new FailServiceResult<Profile>("Perfil não encontrado");
            }

            var result = new OkServiceResult<Profile>(profile);

            return result;
        }
    }
}
