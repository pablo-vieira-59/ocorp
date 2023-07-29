using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class UserCreateDTO
    {
        public required string Password { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string DocumentNumber { get; set; }
        public long ZipCode { get; set; }
        public required string AddressName { get; set; }
        public long Number { get; set; }
        public required string Neighborhood { get; set; }
        public required string City { get; set; }
        public required string State { get; set; }
        public required string BirthdayDate { get; set; }
        public required string ClientName { get; set; }
        
        public int ProfileId { get; set; }
        public bool IsNewClient { get; set; }
    }
}
