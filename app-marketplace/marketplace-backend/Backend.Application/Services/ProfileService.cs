using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Backend.Application.Services.Interfaces;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Domain.DTO;
using Microsoft.EntityFrameworkCore;

namespace Backend.Application.Services
{
    public class ProfileService : IProfileService
    {
        IProfileRepository _profileRepository;

        public ProfileService(IProfileRepository profileRepository)
        {
            _profileRepository = profileRepository;
        }

        public async Task<ServiceResult<List<Profile>>> AllDetails(FilterDTO filter)
        {
            var profiles = await _profileRepository.Get(filter).Select(e => new Profile
            {
                Id = e.Id,
                Name = e.Name,
            }).ToListAsync();

            return new OkServiceResult<List<Profile>>(profiles);
        }

        public async Task<ServiceResult<int>> AllDetailsCount(FilterDTO filter)
        {
            var result = await _profileRepository.Get(filter).CountAsync();

            return new OkServiceResultStruct<int>(result);
        }

        public async Task<ServiceResult<List<Profile>>> GetAll()
        {
            var filter = new FilterDTO();

            var profiles = await _profileRepository.Get(filter).Select(e => new Profile
            {
                Id=e.Id,
                Name=e.Name,
            }).ToListAsync();

            var result = new OkServiceResult<List<Profile>>(profiles);

            return result;
        }
    }
}
