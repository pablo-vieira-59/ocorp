using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class SubCategory
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string? Name { get; set; }

        public virtual Category? Category { get; set; }

        public virtual List<Product>? Products { get; set; }


        public class Map : IEntityTypeConfiguration<SubCategory>
        {
            public void Configure(EntityTypeBuilder<SubCategory> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();

                entityBuilder.HasOne(x => x.Category).WithMany(x => x.SubCategories).HasForeignKey(x => x.CategoryId);

                entityBuilder.HasMany(x => x.Products).WithOne(x => x.SubCategory).HasForeignKey(x => x.SubCategoryId);
            }
        }
    }
}
