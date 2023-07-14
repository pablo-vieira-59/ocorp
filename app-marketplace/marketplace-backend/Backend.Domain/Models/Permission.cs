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

    public enum PermissionEnum
    {
        Tela_Usuarios = 1,
        Tela_Permissoes,
        Tela_Perfis,
        Componente_MenuLateral,
        Tela_Estabelecimentos,
        Tela_Dashboard,
        Cadastro_Admin,
        Cadastro_Gerente,
        Cadastro_Supervisor,
        Cadastro_Funcionario
    }
}
