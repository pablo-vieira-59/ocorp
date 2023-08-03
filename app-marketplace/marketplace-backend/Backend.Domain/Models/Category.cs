using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Category
    {
        public long Id { get; set; }
        public long ClientId { get; set; }
        public string? Name { get; set; }
        public string? Color { get; set; }

        public virtual Client? Client { get; set; }

        public virtual List<SubCategory>? SubCategories { get; set; }

        public static IQueryable<Category> ToBasic(IQueryable<Category> query)
        {
            var result = query.Select(x => 
            new Category { 
                Id = x.Id, 
                Name = x.Name, 
                ClientId = x.ClientId,
                Color = x.Color,
                SubCategories = x.SubCategories!.Select(z => new SubCategory
                {
                    Color = z.Color,
                    Name = z.Name,
                    Id = z.Id,
                }).ToList(),
            });

            return result;
        }

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
