using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Models
{
    public class Attachment
    {
        public long Id { get; set; }
        public Guid? Guid { get; set; }
        public string? Type { get; set; }
        public int AttachmentTypeId { get; set; }
        public string? Extension { get; set; }

        public virtual AttachmentType? AttachmentType { get; set; }

        public class Map : IEntityTypeConfiguration<Attachment>
        {
            public void Configure(EntityTypeBuilder<Attachment> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Guid).IsRequired();
                entityBuilder.Property(x => x.AttachmentTypeId).IsRequired();
                entityBuilder.Property(x => x.Type).IsRequired();
                entityBuilder.Property(x => x.Extension).IsRequired();

                entityBuilder.HasOne(x => x.AttachmentType).WithMany(x => x.Attachments).HasForeignKey(x => x.AttachmentTypeId);
            }
        }
    }
}
