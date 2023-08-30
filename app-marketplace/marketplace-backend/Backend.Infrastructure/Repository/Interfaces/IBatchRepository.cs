using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IBatchRepository : IBaseRepository<Batch>
    {
        public bool ChangeStatus(Batch batch, Product product, BatchHistory batchHistory);
        public Task<List<BatchStatus>> GetStatusList();
    }
}
