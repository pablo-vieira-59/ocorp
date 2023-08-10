using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;


namespace Backend.Infrastructure.Repository
{
    public class BrandRepository : BaseRepository<Brand>, IBrandRepository
    {
        public BrandRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
