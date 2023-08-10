using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.DTO
{
    public class AttachmentGetDTO
    {
        public required byte[] Data { get; set; }
        public required string Type { get; set; }
    }
}
