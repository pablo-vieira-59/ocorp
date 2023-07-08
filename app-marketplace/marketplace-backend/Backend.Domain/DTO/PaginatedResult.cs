using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class PaginatedResult <T> where T : class
    {
        public List<T> Items { get; set; }
        public int TotalCount { get; set; }
    }
}
