using Backend.Domain.Models;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<bool> EditUser(User user, List<long> establishmentsToAdd, List<long> establishmentsToRemove);
    }
}
