using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Runtime.Serialization;

namespace Backend.Domain.Models
{
    public class Permission
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual Profile? Profile { get; set; }
        public virtual List<Permission_Profile>? Permission_Profiles { get; set; }


        public class Map : IEntityTypeConfiguration<Permission>
        {
            public void Configure(EntityTypeBuilder<Permission> entityBuilder)
            {
                entityBuilder.HasKey(x => x.Id);
                entityBuilder.Property(x => x.Name).IsRequired();

                entityBuilder.HasMany(x => x.Permission_Profiles).WithOne(x => x.Permission).HasForeignKey(x => x.PermissionId);
                entityBuilder.HasOne(x => x.Profile).WithOne(x => x.Permission);
            }
        }
    }

    public enum PermissionEnum
    {
        Tela_Usuarios = 1,
        Tela_Perfis = 3,
        Componente_MenuLateral = 4,
        Tela_Estabelecimentos = 5,
        Tela_Dashboard = 6,
        Cadastro_Admin = 7,
        Cadastro_Gerente = 8,
        Cadastro_Supervisor = 9,
        Cadastro_Funcionario = 10,
        Cadastro_Estabelecimento = 11,
    }
}
