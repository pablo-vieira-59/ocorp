using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Client
    {
        public long Id { get; set; }
        public string? Name { get; set; }

        public virtual List<User>? Users { get; set; }
        public virtual List<Establishment>? Establishments { get; set; }
        public virtual List<Brand>? Brands { get; set; }
        public virtual List<Product>? Products { get; set; }
        public virtual List<Category>? Categories { get; set; }
        public virtual List<Supplier>? Suppliers { get; set; }
        public virtual List<Batch>? Batches { get; set; }


        public class Map : IEntityTypeConfiguration<Client>
        {
            public void Configure(EntityTypeBuilder<Client> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();

                entityBuilder.HasMany(x => x.Users).WithOne(x => x.Client);
                entityBuilder.HasMany(x => x.Establishments).WithOne(x => x.Client);
                entityBuilder.HasMany(x => x.Brands).WithOne(x => x.Client);
                entityBuilder.HasMany(x => x.Products).WithOne(x => x.Client);
                entityBuilder.HasMany(x => x.Categories).WithOne(x => x.Client);
                entityBuilder.HasMany(x => x.Suppliers).WithOne(x => x.Client);
                entityBuilder.HasMany(x => x.Batches).WithOne(x => x.Client);
            }
        }

    }
}
