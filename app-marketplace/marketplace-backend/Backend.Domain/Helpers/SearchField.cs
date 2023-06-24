using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Helpers
{
    public class SearchField
    {
        public string? Property { get; set; }
        public string? Value { get; set; }
        public string? Operator { get; set; }
    }
}
