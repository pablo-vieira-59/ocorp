using Backend.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Infrastructure.Repository.Interfaces
{
    public interface IAttachmentRepository : IBaseRepository<Attachment>
    {
        Task<AttachmentType> GetAttachmentTypeAsync(int attachmentTypeId);
        IQueryable<Attachment> GetByGuid(Guid guid);
    }
}
