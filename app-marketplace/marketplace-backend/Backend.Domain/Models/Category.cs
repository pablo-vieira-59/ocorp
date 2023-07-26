using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Category
    {
        public long Id { get; set; }
        public long ClientId { get; set; }
        public string? Name { get; set; }

        public virtual Client? Client { get; set; }

        public virtual List<SubCategory>? SubCategories { get; set; }

        public class Map : IEntityTypeConfiguration<Category>
        {
            public void Configure(EntityTypeBuilder<Category> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();

                entityBuilder.HasMany(x => x.SubCategories).WithOne(x => x.Category).HasForeignKey(x => x.CategoryId);
            }
        }
    }
}
