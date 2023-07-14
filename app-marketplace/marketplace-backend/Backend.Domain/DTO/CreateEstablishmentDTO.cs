using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class CreateEstablishmentDTO
    {
        public required string CorporateName { get; set; }
        public required string FantasyName { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string DocumentNumber { get; set; }
        public string? Url { get; set; }
        public long Number { get; set; }
        public required string AddressName { get; set; }
        public required string Neighborhood { get; set; }
        public required string City { get; set; }
        public required string State { get; set; }
        public long ZipCode { get; set; }
    }
}
