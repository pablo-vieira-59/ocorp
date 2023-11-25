using Microsoft.EntityFrameworkCore;
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

builder.Services.AddEntityFrameworkNpgsql();

builder.Services.AddDbContext<Backend.Infrastructure.Context.AppContext>(options =>
{
    var configBuilder = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true)
    .AddEnvironmentVariables();

    IConfigurationRoot configuration = configBuilder.Build();
    options.UseNpgsql(configuration.GetConnectionString("DB"));
    //options.UseLazyLoadingProxies(false);
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

builder.Services.AddTransient<IAttachmentRepository, AttachmentRepository>();
builder.Services.AddTransient<IAttachmentTypeRepository, AttachmentTypeRepository>();

builder.Services.AddTransient<IAttachmentService, AttachmentService>();
#endregion

#region Build
var app = builder.Build();

app.UseCors("AllowAllOrigins");

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
#endregion
