using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class LoginReponseDTO
    {
        public required string Token { get; set; }

        public required string Guid { get; set; }
    }
}
