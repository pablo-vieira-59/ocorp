using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.Domain.Models
{
    public class EstablishmentStatus
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual List<Establishment>? Establishments { get; set; }


        public class Map : IEntityTypeConfiguration<EstablishmentStatus>
        {
            public void Configure(EntityTypeBuilder<EstablishmentStatus> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();

                entityBuilder.HasMany(x => x.Establishments).WithOne(x => x.EstablishmentStatus).HasForeignKey(x => x.EstablishmentStatusId);
            }
        }
    }

    public enum EstablishmentStatusEnum
    {
        Active = 1,
        Inactive,
        Canceled
    }
}
