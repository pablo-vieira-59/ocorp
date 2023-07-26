using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Supplier_Product
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public long SupplierId { get; set; }

        public virtual Product? Product { get; set; }
        public virtual Supplier? Supplier { get; set; }


        public class Map : IEntityTypeConfiguration<Supplier_Product>
        {
            public void Configure(EntityTypeBuilder<Supplier_Product> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.HasOne(x => x.Supplier).WithMany(x => x.Supplier_Products).HasForeignKey(x => x.SupplierId);
                entityBuilder.HasOne(x => x.Product).WithMany(x => x.Supplier_Products).HasForeignKey(x => x.ProductId);
            }
        }
    }
}
