using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class BrandEditDTO
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public required string Color { get; set;}
    }
}
