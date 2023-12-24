using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class BatchStatus
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Color { get; set; }
        public virtual List<Batch>? Batches { get; set; }
        public virtual List<BatchHistory>? BatchHistories { get; set; }

        public class Map : IEntityTypeConfiguration<BatchStatus>
        {
            public void Configure(EntityTypeBuilder<BatchStatus> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();
                entityBuilder.Property(x => x.Color).IsRequired();

                entityBuilder.HasMany(x => x.Batches).WithOne(x => x.BatchStatus).HasForeignKey(x => x.BatchStatusId);
            }
        }
    }

    public enum BatchStatusEnum
    {
        EmTransito = 1,
        EmEstoque = 2,
        Cancelado = 3,
    }
}
