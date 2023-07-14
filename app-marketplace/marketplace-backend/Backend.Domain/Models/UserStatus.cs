using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class UserStatus
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public virtual List<User>? Users { get; set; }


        public class Map : IEntityTypeConfiguration<UserStatus>
        {
            public void Configure(EntityTypeBuilder<UserStatus> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();

                entityBuilder.HasMany(x => x.Users).WithOne(x => x.UserStatus).HasForeignKey(x => x.UserStatusId);
            }
        }
    }

    public enum UserStatusEnum
    {
        Active = 1,
        Inactive,
        Canceled
    }
}
