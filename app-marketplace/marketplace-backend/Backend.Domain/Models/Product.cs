using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Product
    {
        public long Id { get; set; }
        public long ClientId { get; set; }
        public long SubCategoryId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }

        public virtual SubCategory? SubCategory { get; set; }
        public virtual Client? Client { get; set; }

        public virtual List<Supplier_Product>? Supplier_Products { get; set; }
        public virtual List<Brand_Product>? Brand_Products { get; set; }
        public virtual List<Product_Establishment>? Product_Establishments { get; set; }

        public virtual List<Batch>? Batches { get; set; }
        
        public static IQueryable<Product> ToBasic(IQueryable<Product> query)
        {
            var result = query.Select(x => new Product
            {
                Id = x.Id,
                ClientId = x.ClientId,
                SubCategoryId = x.SubCategoryId,
                Name = x.Name,
                Description = x.Description,
                Price = x.Price,
                ImageUrl = x.ImageUrl,
                Brand_Products = x.Brand_Products!.Select(z => new Brand_Product
                {
                    Brand = new Brand { Name = z.Brand!.Name }
                }).ToList(),
            });

            return result;
        }

        public class Map : IEntityTypeConfiguration<Product>
        {
            public void Configure(EntityTypeBuilder<Product> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.Property(x => x.Name).IsRequired();
                entityBuilder.Property(x => x.Description).IsRequired();
                entityBuilder.Property(x => x.Price).IsRequired();
                entityBuilder.Property(x => x.ImageUrl).IsRequired();

                entityBuilder.HasOne(x => x.SubCategory).WithMany(x => x.Products).HasForeignKey(x => x.SubCategoryId);
                
                entityBuilder.HasMany(x => x.Batches).WithOne(x => x.Product).HasForeignKey(x => x.ProductId);
                entityBuilder.HasMany(x => x.Supplier_Products).WithOne(x => x.Product).HasForeignKey(x => x.ProductId);
                entityBuilder.HasMany(x => x.Brand_Products).WithOne(x => x.Product).HasForeignKey(x => x.ProductId);
                entityBuilder.HasMany(x => x.Product_Establishments).WithOne(x => x.Product).HasForeignKey(x => x.ProductId);
            }
        }
    }
}
 