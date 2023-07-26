using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class BatchStatus
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual List<Batch>? Batches { get; set; }

        public class Map : IEntityTypeConfiguration<BatchStatus>
        {
            public void Configure(EntityTypeBuilder<BatchStatus> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();

                entityBuilder.HasMany(x => x.Batches).WithOne(x => x.BatchStatus).HasForeignKey(x => x.BatchStatusId);
            }
        }
    }

    public enum BacthStatusEnum
    {
        Active = 1,
        Inactive = 2,
        Canceled = 3
    }
}
