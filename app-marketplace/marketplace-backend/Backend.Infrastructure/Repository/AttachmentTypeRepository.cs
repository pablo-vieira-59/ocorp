using Backend.Domain.Models;
using Backend.Infrastructure.Repository.Interfaces;

namespace Backend.Infrastructure.Repository
{
    public class AttachmentTypeRepository : BaseRepository<AttachmentType>, IAttachmentTypeRepository
    {
        public AttachmentTypeRepository(Context.AppContext context) : base(context)
        {

        }
    }
}
