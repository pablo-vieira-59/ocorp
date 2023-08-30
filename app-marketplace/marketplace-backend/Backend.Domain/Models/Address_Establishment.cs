using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Address_Establishment
    {
        public long Id { get; set; }
        public long EstablishmentId { get; set; }
        public long AddressId { get; set; }

        public virtual Establishment? Establishment { get; set; }
        public virtual Address? Address { get; set; }


        public class Map : IEntityTypeConfiguration<Address_Establishment>
        {
            public void Configure(EntityTypeBuilder<Address_Establishment> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.HasOne(x => x.Address).WithMany(x => x.Address_Establishments);
                entityBuilder.HasOne(x => x.Establishment).WithMany(x => x.Address_Establishments);
            }
        }
    }
}
