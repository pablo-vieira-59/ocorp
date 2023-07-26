using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Batch
    {
        public long Id { get; set; }
        public long ClientId { get; set; }
        public long SupplierId { get; set; }
        public long ProductId { get; set; }
        public long AddressId { get; set; }
        public int BatchStatusId { get; set; }
        public string? Serial { get; set; }
        public string? Description { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal UnitPrice { get; set; }
        public int TotalUnits { get; set; }
        public int RemainingUnits { get; set; }

        public DateTime? FabricatedAt { get; set; }
        public DateTime? ValidUntil { get; set; }
        public DateTime? OrderedAt { get; set; }
        public DateTime? ReceivedAt { get; set; }

        public virtual BatchStatus? BatchStatus { get; set; }
        public virtual Product? Product { get; set; }
        public virtual Supplier? Supplier { get; set; }
        public virtual Address? Address{ get; set; }
        public virtual Client? Client{ get; set; }


        public class Map : IEntityTypeConfiguration<Batch>
        {
            public void Configure(EntityTypeBuilder<Batch> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.Property(x => x.Serial).IsRequired();
                entityBuilder.Property(x => x.Description).IsRequired();
                entityBuilder.Property(x => x.TotalPrice).IsRequired();
                entityBuilder.Property(x => x.UnitPrice).IsRequired();
                entityBuilder.Property(x => x.TotalUnits).IsRequired();
                entityBuilder.Property(x => x.RemainingUnits).IsRequired();
                entityBuilder.Property(x => x.FabricatedAt).IsRequired();
                entityBuilder.Property(x => x.OrderedAt).IsRequired();
                entityBuilder.Property(x => x.ReceivedAt).IsRequired();

                entityBuilder.HasOne(x => x.BatchStatus).WithMany(x => x.Batches).HasForeignKey(x => x.BatchStatusId);
                entityBuilder.HasOne(x => x.Product).WithMany(x => x.Batches).HasForeignKey(x => x.ProductId);
                entityBuilder.HasOne(x => x.Supplier).WithMany(x => x.Batches).HasForeignKey(x => x.SupplierId);

                entityBuilder.HasOne(x => x.Address).WithMany(x => x.Batches).HasForeignKey(x => x.AddressId);
            }
        }
    }
}
