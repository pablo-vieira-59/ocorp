using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Brand
    {
        public long Id { get; set; }
        public long ClientId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Color { get; set; }

        public virtual Client? Client { get; set; }

        public virtual List<Brand_Product>? Brand_Products { get; set; }

        public static IQueryable<Brand> ToBasic(IQueryable<Brand> query){
            var result = query.Select(x => new Brand
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Color = x.Color,
                ClientId = x.ClientId,
            });

            return result;
        }

        public class Map : IEntityTypeConfiguration<Brand>
        {
            public void Configure(EntityTypeBuilder<Brand> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();
                entityBuilder.Property(x => x.Description).IsRequired();
                entityBuilder.Property(x => x.Color).IsRequired();

                entityBuilder.HasMany(x => x.Brand_Products).WithOne(x => x.Brand).HasForeignKey(x => x.BrandId);
            }
        }
    }
}
