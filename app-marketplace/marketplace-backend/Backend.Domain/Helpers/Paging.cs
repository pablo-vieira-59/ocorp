using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Helpers
{
    public class Paging
    {
        public int Page { get; set; }
        public int ItemsPerPage { get; set; }
        public string? OrderBy { get; set; }
        public bool Descending { get; set; }
    }
}
