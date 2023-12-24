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
        public virtual User? User { get; set; }
        public virtual BatchStatus? ToStatus { get; set; }

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
                entityBuilder.HasOne(x => x.User).WithMany(x => x.BatchHistories).HasForeignKey(x => x.UserId);
                entityBuilder.HasOne(x => x.ToStatus).WithMany(x => x.BatchHistories).HasForeignKey(x => x.BatchStatusIdTo);
            }
        }

        public static IQueryable<BatchHistory> ToBasic(IQueryable<BatchHistory> query)
        {
            var result = query.Select(e => new BatchHistory
            {
                Id = e.Id,
                BatchId = e.BatchId,
                UserId = e.UserId,
                Message = e.Message,
                CreatedAt = e.CreatedAt,
                ToStatus = e.ToStatus,
                BatchStatusIdTo = e.BatchStatusIdTo,
                BatchStatusIdFrom = e.BatchStatusIdFrom,
                User = e.User
            });

            return result;
        }
    }
}
