using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Address_User
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public long AddressId { get; set; }

        public virtual User User { get; set; }
        public virtual Address Address { get; set; }


        public class Map : IEntityTypeConfiguration<Address_User>
        {
            public void Configure(EntityTypeBuilder<Address_User> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.HasOne(x => x.Address).WithMany(x => x.Address_Users).HasForeignKey(x => x.AddressId);
                entityBuilder.HasOne(x => x.User).WithMany(x => x.Address_Users).HasForeignKey(x => x.UserId);
            }
        }
    }
}
