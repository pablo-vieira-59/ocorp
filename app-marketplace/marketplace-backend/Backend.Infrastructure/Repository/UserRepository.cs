using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repository
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(Context.AppContext context) : base(context)
        {

        }

        public async Task<bool> EditUser(User user, List<long> establishmentsToAdd, List<long> establishmentsToRemove)
        {
            var toAdd = new List<User_Establishment>();
            foreach (var establishmentId in establishmentsToAdd)
            {
                toAdd.Add(new User_Establishment { UserId = user.Id, EstablishmentId = establishmentId });
            }

            var toRemove = await _context.User_Establishment.Where(x => x.UserId == user.Id && establishmentsToRemove.Contains(x.EstablishmentId)).ToListAsync();

            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    _context.Update(user);
                    _context.AddRange(toAdd);
                    _context.RemoveRange(toRemove);
                    _context.SaveChanges();

                    transaction.Commit();
                    return true;
                }
                catch
                {
                    transaction.Rollback();
                    return false;
                }
            }
        }
    }
}
