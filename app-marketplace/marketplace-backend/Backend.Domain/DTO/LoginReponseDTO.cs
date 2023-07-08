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
        public string Token { get; set; }

        public string Guid { get; set; }
    }
}
