using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class UserEditDTO
    {
        public long Id { get; set; }
        public required string Name { get; set; }
        public required string Password { get; set; }
        public required string PhoneNumber { get; set; }
        public int ProfileId { get; set; }
        public required string BirthdayDate { get; set; }

        public List<Establishment>? UserEstablishments { get; set; }
        
    }
}
