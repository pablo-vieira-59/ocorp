using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class CreateEstablishmentDTO
    {
        public string CorporateName { get; set; }
        public string FantasyName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DocumentNumber { get; set; }
        public string? Url { get; set; }
        public long Number { get; set; }
        public string AddressName { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public long ZipCode { get; set; }
    }
}
