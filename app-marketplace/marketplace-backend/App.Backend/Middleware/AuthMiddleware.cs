using App.Backend.Livraria.Middleware;
using Backend.Application.Services.Interfaces;
using Backend.Domain.Helpers;
using Backend.Domain.Models;
using Microsoft.AspNetCore.Mvc.Controllers;
using System.Reflection;
using System.Text.Json;

public class AuthMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IServiceProvider _serviceProvider;

    public AuthMiddleware(RequestDelegate next, IServiceProvider serviceProvider)
    {
        _next = next;
        _serviceProvider = serviceProvider;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        using (var scope = _serviceProvider.CreateScope())
        {
            var userService = scope.ServiceProvider.GetRequiredService<IUserService>();

            var actionDescriptor = context.GetEndpoint()?.Metadata.GetMetadata<ControllerActionDescriptor>();

            if (actionDescriptor == null)
            {
                await _next(context);
                return;
            }

            var methodInfo = actionDescriptor.MethodInfo;
            var hasAttribute = methodInfo.GetCustomAttribute<FreeAccessAttribute>() != null;

            if (hasAttribute)
            {
                await _next(context);
                return;
            }

            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token == null)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Access Denied");
                return;
            }

            var tokenDecrypt = EncryptionHelper.Decrypt(token);

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true,
            };

            var userAuth = JsonSerializer.Deserialize<UserAccess>(tokenDecrypt, options);

            if (userAuth == null)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync("Access Denied");
                return;
            }

            var result = await userService.IsAuthenticated(userAuth.UserId, userAuth.Token);

            if (!result.Success)
            {
                context.Response.StatusCode = 403;
                await context.Response.WriteAsync(result.Message!);
                return;
            }
        }

        await _next(context);
    }
}

public static class AuthMiddlewareExtensions
{
    public static IApplicationBuilder UseAuthMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<AuthMiddleware>();
    }
}
