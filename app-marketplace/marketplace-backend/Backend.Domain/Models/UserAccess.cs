using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Backend.Domain.Models
{
    public class UserAccess
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public Guid Token { get; set; }
        public DateTime? TokenValidUntil { get; set; }

        public virtual User? User { get; set; }

        public class Map : IEntityTypeConfiguration<UserAccess>
        {
            public void Configure(EntityTypeBuilder<UserAccess> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.UserId).IsRequired();
                entityBuilder.Property(x => x.Token).IsRequired();
                entityBuilder.Property(x => x.TokenValidUntil).IsRequired();

                entityBuilder.HasOne(x => x.User).WithOne(x => x.UserAccess).HasForeignKey<UserAccess>(x => x.UserId);
            }
        }
    }
}
