using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Text.Json.Serialization;

namespace Backend.Domain.Models
{
    public class User
    {
        public long Id { get; set; }
        public int ProfileId { get; set; }
        public int UserStatusId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string DocumentNumber { get; set; }
        public Guid Guid { get; set; }
        
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLogin { get; set; }

        public virtual Profile Profile { get; set; }
        public virtual UserAccess UserAccess { get; set; }
        public virtual UserStatus UserStatus { get; set; }

        public virtual List<Address_User> Address_Users { get; set; }

        public class Map : IEntityTypeConfiguration<User>
        {
            public void Configure(EntityTypeBuilder<User> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Username).IsRequired();
                entityBuilder.Property(x => x.Password).IsRequired();
                entityBuilder.Property(x => x.Name).IsRequired();
                entityBuilder.Property(x => x.Email).IsRequired();
                entityBuilder.Property(x => x.DocumentNumber).IsRequired();
                entityBuilder.Property(x => x.PhoneNumber).IsRequired();
                entityBuilder.Property(x => x.CreatedAt).IsRequired();
                entityBuilder.Property(x => x.LastLogin).IsRequired();

                entityBuilder.HasOne(x => x.UserAccess).WithOne(x => x.User).HasForeignKey<User>(x => x.Id);
                entityBuilder.HasOne(x => x.Profile).WithMany(x => x.Users).HasForeignKey(x => x.ProfileId);
                entityBuilder.HasOne(x => x.UserStatus).WithMany(x => x.Users).HasForeignKey(x => x.UserStatusId);
                
                entityBuilder.HasMany(x => x.Address_Users).WithOne(x => x.User).HasForeignKey(x => x.UserId);
            }
        }

    }
}
