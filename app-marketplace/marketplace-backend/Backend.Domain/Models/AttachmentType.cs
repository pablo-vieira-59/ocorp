using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Backend.Domain.Models
{
    public class AttachmentType
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Folder { get; set; }

        public virtual List<Attachment>? Attachments { get; set; }

        public class Map : IEntityTypeConfiguration<AttachmentType>
        {
            public void Configure(EntityTypeBuilder<AttachmentType> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();
                entityBuilder.Property(x => x.Folder).IsRequired();

                //entityBuilder.HasMany(x => x.Attachments).WithOne(x => x.AttachmentType);
            }
        }
    }
}
