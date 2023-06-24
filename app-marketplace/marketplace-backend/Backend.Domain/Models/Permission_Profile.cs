using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Permission_Profile
    {
        public int Id { get; set; }
        public int ProfileId { get; set; }
        public int PermissionId { get; set; }

        public virtual Profile Profile { get; set; }
        public virtual Permission Permission { get; set; }


        public class Map : IEntityTypeConfiguration<Permission_Profile>
        {
            public void Configure(EntityTypeBuilder<Permission_Profile> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);

                entityBuilder.HasOne(x => x.Profile).WithMany(x => x.Permission_Profiles).HasForeignKey(x => x.ProfileId);
                entityBuilder.HasOne(x => x.Permission).WithMany(x => x.Permission_Profiles).HasForeignKey(x => x.PermissionId);
            }
        }
    }
}
