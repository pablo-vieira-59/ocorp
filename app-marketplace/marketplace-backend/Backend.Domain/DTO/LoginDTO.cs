using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class LoginDTO
    {
        public required string Username { get; set; }

        public required string Password { get; set; }
    }
}
