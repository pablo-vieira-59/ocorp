using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;


namespace Backend.Infrastructure.Repository
{
    public class CategoryRepository : BaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
