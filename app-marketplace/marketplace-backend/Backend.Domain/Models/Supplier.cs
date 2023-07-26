using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Supplier
    {
        public long Id { get; set; }
        public long ClientId { get; set; }
        public string? FantasyName { get; set; }
        public string? DocumentNumber { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        public virtual Client? Client { get; set; }

        public virtual List<Supplier_Establishment>? Supplier_Establishments { get; set; }
        public virtual List<Supplier_Product>? Supplier_Products { get; set; }
        public virtual List<Batch>? Batches { get; set; }


        public class Map : IEntityTypeConfiguration<Supplier>
        {
            public void Configure(EntityTypeBuilder<Supplier> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.FantasyName).IsRequired();
                entityBuilder.Property(x => x.DocumentNumber).IsRequired();
                entityBuilder.Property(x => x.Email).IsRequired();
                entityBuilder.Property(x => x.PhoneNumber).IsRequired();

                entityBuilder.HasMany(x => x.Supplier_Establishments).WithOne(x => x.Supplier).HasForeignKey(x => x.SupplierId);
                entityBuilder.HasMany(x => x.Supplier_Products).WithOne(x => x.Supplier).HasForeignKey(x => x.SupplierId);
                entityBuilder.HasMany(x => x.Batches).WithOne(x => x.Supplier).HasForeignKey(x => x.SupplierId);

            }
        }
    }
}
