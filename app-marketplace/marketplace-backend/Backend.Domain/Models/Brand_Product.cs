using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Brand_Product
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public long BrandId { get; set; }

        public virtual Product? Product { get; set; }
        public virtual Brand? Brand { get; set; }


        public class Map : IEntityTypeConfiguration<Brand_Product>
        {
            public void Configure(EntityTypeBuilder<Brand_Product> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.HasOne(x => x.Product).WithMany(x => x.Brand_Products).HasForeignKey(x => x.ProductId);
                entityBuilder.HasOne(x => x.Brand).WithMany(x => x.Brand_Products).HasForeignKey(x => x.BrandId);
            }
        }
    }
}
