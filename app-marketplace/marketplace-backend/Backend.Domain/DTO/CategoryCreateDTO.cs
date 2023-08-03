using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class CategoryCreateDTO
    {
        public required string Name { get; set; }
        public required string Color { get; set; }
        public required List<SubCategory> SubCategories { get; set; }
    }
}
