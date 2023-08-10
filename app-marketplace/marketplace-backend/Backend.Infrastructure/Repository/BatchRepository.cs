using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;


namespace Backend.Infrastructure.Repository
{
    public class BatchRepository : BaseRepository<Batch>, IBatchRepository
    {
        public BatchRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
