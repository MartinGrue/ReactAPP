using System;
using Application.interfaces;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using AutoMapper;
using API;
using Persistence;
using Microsoft.EntityFrameworkCore;

namespace ExtensionMethods
{
    public static class MyExtensions
    {
        public static IHost SeedDatabase(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<DataContext>();
                    context.Database.Migrate();
                    var userManager = services.GetRequiredService<UserManager<AppUser>>();
                    var photoAccessor = services.GetRequiredService<IPhotoAccessor>();
                    var mapper = services.GetRequiredService<IMapper>();
                    SmallSeed.Seed(context, userManager, photoAccessor, mapper).Wait();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured during Database migration");
                }
            }
            return host;
        }
    }

}