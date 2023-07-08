using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<User>? Users { get; set; }
        public virtual List<Permission_Profile>? Permission_Profiles { get; set; }


        public class Map : IEntityTypeConfiguration<Profile>
        {
            public void Configure(EntityTypeBuilder<Profile> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();

                entityBuilder.HasMany(x => x.Users).WithOne(x => x.Profile).HasForeignKey(x => x.ProfileId);
                entityBuilder.HasMany(x => x.Permission_Profiles).WithOne(x => x.Profile).HasForeignKey(x => x.ProfileId);
            }
        }
    }
}
