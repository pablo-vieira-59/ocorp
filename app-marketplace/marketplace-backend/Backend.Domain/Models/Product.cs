using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Product
    {
        public long Id { get; set; }
        public long EstablishmentId { get; set; }
        public int SubCategoryId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
        public string? Brand { get; set; }

        public virtual SubCategory? SubCategory { get; set; }

        public virtual Establishment? Establishment { get; set; }


        public class Map : IEntityTypeConfiguration<Product>
        {
            public void Configure(EntityTypeBuilder<Product> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.Property(x => x.Name).IsRequired();
                entityBuilder.Property(x => x.Description).IsRequired();
                entityBuilder.Property(x => x.Price).IsRequired();
                entityBuilder.Property(x => x.ImageUrl).IsRequired();
                entityBuilder.Property(x => x.Brand).IsRequired();

                entityBuilder.HasOne(x => x.SubCategory).WithMany(x => x.Products).HasForeignKey(x => x.SubCategoryId);
                entityBuilder.HasOne(x => x.Establishment).WithMany(x => x.Products).HasForeignKey(x => x.EstablishmentId);
            }
        }
    }
}
