using Backend.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace Backend.Infrastructure.Context
{
    public class AppContext : DbContext
    {
        public AppContext(DbContextOptions<AppContext> options) : base(options) {
            this.ChangeTracker.LazyLoadingEnabled = false;
            System.AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
    
        public DbSet<Profile> Profile { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserAccess> UserAccess { get; set; }
        public DbSet<Permission> Permission { get; set; }
        public DbSet<Permission_Profile> Permission_Profile { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Establishment> Establishment { get; set; }
        public DbSet<SubCategory> SubCategory { get; set; }
        public DbSet<UserStatus> UserStatus { get; set; }
        public DbSet<EstablishmentStatus> EstablishmentStatus { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Address_Establishment> Address_Establishment { get; set; }
        public DbSet<Address_User> Address_User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new User.Map());
            modelBuilder.ApplyConfiguration(new UserAccess.Map());            
            modelBuilder.ApplyConfiguration(new Profile.Map());            
            modelBuilder.ApplyConfiguration(new UserStatus.Map());            
            modelBuilder.ApplyConfiguration(new Permission_Profile.Map());            
            modelBuilder.ApplyConfiguration(new Permission.Map());       
            modelBuilder.ApplyConfiguration(new Product.Map());
            modelBuilder.ApplyConfiguration(new Establishment.Map());
            modelBuilder.ApplyConfiguration(new EstablishmentStatus.Map());
            modelBuilder.ApplyConfiguration(new SubCategory.Map());
            modelBuilder.ApplyConfiguration(new Category.Map());
            modelBuilder.ApplyConfiguration(new Address.Map());
            modelBuilder.ApplyConfiguration(new Address_Establishment.Map());
            modelBuilder.ApplyConfiguration(new Address_User.Map());
            modelBuilder.ApplyConfiguration(new User_Establishment.Map());

        }

    }
}
