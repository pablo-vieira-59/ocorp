using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class EditProfilePermissionsRequestDTO
    {
        public required List<Permission> Permissions { get; set; }
        public int ProfileId { get; set; }
    }
}
