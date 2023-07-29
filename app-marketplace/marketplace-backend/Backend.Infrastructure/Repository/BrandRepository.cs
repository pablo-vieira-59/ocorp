using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using System.Data.Entity;

namespace Backend.Infrastructure.Repository
{
    public class BrandRepository : BaseRepository<Brand>, IBrandRepository
    {
        public BrandRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
