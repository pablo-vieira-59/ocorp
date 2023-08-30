using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class BatchHistory
    {
        public int Id { get; set; }
        public long BatchId { get; set; }
        public long UserId { get; set; }
        public int BatchStatusIdFrom { get; set; }
        public int BatchStatusIdTo { get; set; }
        public string? Message { get; set; }
        public DateTime? CreatedAt { get; set; }
        public virtual Batch? Batch { get; set; }

        public class Map : IEntityTypeConfiguration<BatchHistory>
        {
            public void Configure(EntityTypeBuilder<BatchHistory> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.BatchId).IsRequired();
                entityBuilder.Property(x => x.UserId).IsRequired();
                entityBuilder.Property(x => x.BatchStatusIdFrom).IsRequired();
                entityBuilder.Property(x => x.BatchStatusIdTo).IsRequired();
                entityBuilder.Property(x => x.Message).IsRequired();
                entityBuilder.Property(x => x.CreatedAt).IsRequired();

                entityBuilder.HasOne(x => x.Batch).WithMany(x => x.BatchHistory).HasForeignKey(x => x.BatchId);
            }
        }
    }
}
