using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class User_Establishment
    {
        public long Id { get; set; }
        public long EstablishmentId { get; set; }
        public long UserId { get; set; }

        public virtual Establishment? Establishment { get; set; }
        public virtual User? User { get; set; }


        public class Map : IEntityTypeConfiguration<User_Establishment>
        {
            public void Configure(EntityTypeBuilder<User_Establishment> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.HasOne(x => x.User).WithMany(x => x.User_Establishments).HasForeignKey(x => x.UserId);
                entityBuilder.HasOne(x => x.Establishment).WithMany(x => x.User_Establishments).HasForeignKey(x => x.EstablishmentId);
            }
        }
    }
}
