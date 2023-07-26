using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Product_Establishment
    {
        public long Id { get; set; }
        public long EstablishmentId { get; set; }
        public long ProductId { get; set; }

        public virtual Establishment? Establishment { get; set; }
        public virtual Product? Product { get; set; }


        public class Map : IEntityTypeConfiguration<Product_Establishment>
        {
            public void Configure(EntityTypeBuilder<Product_Establishment> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.HasOne(x => x.Product).WithMany(x => x.Product_Establishments).HasForeignKey(x => x.ProductId);
                entityBuilder.HasOne(x => x.Establishment).WithMany(x => x.Product_Establishments).HasForeignKey(x => x.EstablishmentId);
            }
        }
    }
}
