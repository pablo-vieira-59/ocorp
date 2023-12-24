using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repository
{
    public class BatchRepository : BaseRepository<Batch>, IBatchRepository
    {
        public BatchRepository(Context.AppContext context) : base(context)
        {

        }

        public bool ChangeStatus(Batch batch, Product product, BatchHistory batchHistory)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    _context.Update(batch);
                    _context.Update(product);
                    _context.Add(batchHistory);
                    _context.SaveChanges();

                    transaction.Commit();
                    return true;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    transaction.Rollback();
                    return false;
                }
            }
        }

        public async Task<List<BatchStatus>> GetStatusList()
        {
            var result = await _context.BatchStatus.ToListAsync();
            return result;
        }

        public async Task<List<BatchHistory>> GetBatchHistory(long batchId)
        {
            var result = await BatchHistory.ToBasic(_context.BatchHistory.Where(x => x.BatchId == batchId)).ToListAsync();
            return result;
        }
    }
}
