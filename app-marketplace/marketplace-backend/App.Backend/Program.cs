using Microsoft.EntityFrameworkCore;
using Backend.Infrastructure.Context;
using Backend.Application.Services.Interfaces;
using Backend.Application.Services;
using Backend.Infrastructure.Repository.Interfaces;
using Backend.Infrastructure.Repository;
using System.Text.Json.Serialization;


#region Setup
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<Backend.Infrastructure.Context.AppContext>(options =>
{
    var configBuilder = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true)
    .AddEnvironmentVariables();

    IConfigurationRoot configuration = configBuilder.Build();
    options.UseNpgsql(configuration.GetConnectionString("DB"));
    options.UseLazyLoadingProxies(false);
});

builder.Services.AddControllers()
    .AddJsonOptions(x =>
    {
        x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
               builder =>
               {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddTransient<IUserRepository, UserRepository>();
builder.Services.AddTransient<IUserAccessRepository, UserAccessRepository>();
builder.Services.AddTransient<IProfileRepository, ProfileRepository>();
builder.Services.AddTransient<IPermissionRepository, PermissionRepository>();
builder.Services.AddTransient<IEstablishmentRepository, EstablishmentRepository>();

builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IProfileService, ProfileService>();
builder.Services.AddTransient<IPermissionService, PermissionService>();
builder.Services.AddTransient<IEstablishmentService, EstablishmentService>();
#endregion

#region Build
var app = builder.Build();

app.UseCors("AllowAllOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthMiddleware();

app.MapControllers();

app.Run();
#endregion
