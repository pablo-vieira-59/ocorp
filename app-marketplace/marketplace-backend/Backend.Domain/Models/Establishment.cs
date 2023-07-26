using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class Establishment
    {
        public long Id { get; set; }
        public long ClientId { get; set; }
        public int EstablishmentStatusId { get; set; }
        public string? CorporateName { get; set; }
        public string? FantasyName { get; set; }
        public string? DocumentNumber { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Url { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual Client? Client { get; set; }
        public virtual EstablishmentStatus? EstablishmentStatus { get; set; }

        public virtual List<Address_Establishment>? Address_Establishments { get; set; }
        public virtual List<User_Establishment>? User_Establishments { get; set; }
        public virtual List<Supplier_Establishment>? Supplier_Establishments { get; set; }
        public virtual List<Product_Establishment>? Product_Establishments { get; set; }

        public virtual List<Product>? Products { get; set; }


        public static IQueryable<Establishment> ToBasic(IQueryable<Establishment> query)
        {
            return query.Select(e => new Establishment
            {
                Id = e.Id,
                EstablishmentStatusId = e.EstablishmentStatusId,
                CorporateName = e.CorporateName,
                FantasyName = e.FantasyName,
                DocumentNumber = e.DocumentNumber,
                Email = e.Email,
                PhoneNumber = e.PhoneNumber,
                Url = e.Url,
                CreatedAt = e.CreatedAt,
                ClientId = e.ClientId,
            });
        }

        public class Map : IEntityTypeConfiguration<Establishment>
        {
            public void Configure(EntityTypeBuilder<Establishment> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.CorporateName).IsRequired();
                entityBuilder.Property(x => x.FantasyName).IsRequired();
                entityBuilder.Property(x => x.DocumentNumber).IsRequired();
                entityBuilder.Property(x => x.Email).IsRequired();
                entityBuilder.Property(x => x.PhoneNumber).IsRequired();
                entityBuilder.Property(x => x.Url).IsRequired();
                entityBuilder.Property(x => x.CreatedAt).IsRequired();

                entityBuilder.HasOne(x => x.Client).WithMany(x => x.Establishments).HasForeignKey(x => x.ClientId);
                entityBuilder.HasOne(x => x.EstablishmentStatus).WithMany(x => x.Establishments).HasForeignKey(x => x.EstablishmentStatusId);
                
                entityBuilder.HasMany(x => x.Address_Establishments).WithOne(x => x.Establishment).HasForeignKey(x => x.EstablishmentId);
                entityBuilder.HasMany(x => x.User_Establishments).WithOne(x => x.Establishment).HasForeignKey(x => x.EstablishmentId);
                entityBuilder.HasMany(x => x.Supplier_Establishments).WithOne(x => x.Establishment).HasForeignKey(x => x.EstablishmentId);
            }
        }
    }
}
