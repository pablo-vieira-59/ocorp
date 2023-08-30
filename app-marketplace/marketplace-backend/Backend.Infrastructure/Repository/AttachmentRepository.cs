using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace Backend.Infrastructure.Repository
{
    public class AttachmentRepository : BaseRepository<Attachment>, IAttachmentRepository
    {
        public AttachmentRepository(Context.AppContext context) : base(context)
        {

        }

        public async Task<AttachmentType> GetAttachmentTypeAsync(int attachmentTypeId)
        {
            var attachmentType = await _context.AttachmentType.Where(e => e.Id == attachmentTypeId).FirstOrDefaultAsync();

            return attachmentType!;
        }

        public IQueryable<Attachment> GetByGuid(Guid guid)
        {
            var attachment = _context.Attachment.Where(e => e.Guid == guid).AsQueryable();

            return attachment;
        }
    }
}
