using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class BatchChangeStatusDTO
    {
        public long BatchId { get; set; }
        public int BatchStatusId { get; set; }
        public string? Message { get; set; }
    }
}
