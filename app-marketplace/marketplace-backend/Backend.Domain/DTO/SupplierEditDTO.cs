using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class SupplierEditDTO
    {
        public required long Id { get; set; }
        public required string FantasyName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }

    }
}
