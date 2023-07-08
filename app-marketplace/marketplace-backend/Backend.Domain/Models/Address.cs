using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Address
    {
        public long Id { get; set; }
        public string Number { get; set; }
        public string AddressName { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }

        public virtual List<Address_Establishment>? Address_Establishments { get; set; }
        public virtual List<Address_User>? Address_Users { get; set; }

        public class Map : IEntityTypeConfiguration<Address>
        {
            public void Configure(EntityTypeBuilder<Address> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.ZipCode).IsRequired();
                entityBuilder.Property(x => x.Number).IsRequired();
                entityBuilder.Property(x => x.AddressName).IsRequired();
                entityBuilder.Property(x => x.Neighborhood).IsRequired();
                entityBuilder.Property(x => x.City).IsRequired();
                entityBuilder.Property(x => x.State).IsRequired();

                entityBuilder.HasMany(x => x.Address_Establishments).WithOne(x => x.Address).HasForeignKey(x => x.AddressId);
                entityBuilder.HasMany(x => x.Address_Users).WithOne(x => x.Address).HasForeignKey(x => x.AddressId);
            }
        }
    }
}
