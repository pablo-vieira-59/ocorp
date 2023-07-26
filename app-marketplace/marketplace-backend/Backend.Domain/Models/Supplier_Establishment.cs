using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Supplier_Establishment
    {
        public long Id { get; set; }
        public long EstablishmentId { get; set; }
        public long SupplierId { get; set; }

        public virtual Establishment? Establishment { get; set; }
        public virtual Supplier? Supplier { get; set; }


        public class Map : IEntityTypeConfiguration<Supplier_Establishment>
        {
            public void Configure(EntityTypeBuilder<Supplier_Establishment> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.HasOne(x => x.Supplier).WithMany(x => x.Supplier_Establishments).HasForeignKey(x => x.SupplierId);
                entityBuilder.HasOne(x => x.Establishment).WithMany(x => x.Supplier_Establishments).HasForeignKey(x => x.EstablishmentId);
            }
        }
    }
}
