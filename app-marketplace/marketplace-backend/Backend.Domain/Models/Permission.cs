using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Runtime.Serialization;

namespace Backend.Domain.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual List<Permission_Profile>? Permission_Profiles { get; set; }


        public class Map : IEntityTypeConfiguration<Permission>
        {
            public void Configure(EntityTypeBuilder<Permission> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();

                entityBuilder.HasMany(x => x.Permission_Profiles).WithOne(x => x.Permission).HasForeignKey(x => x.PermissionId);
            }
        }
    }
}
