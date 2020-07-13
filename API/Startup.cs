
using API.Middleware;
using Application.Activities;
using Domain;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Application.interfaces;
using Infrastructure.security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Application.User;
using AutoMapper;
using System;
using Infrastructure.photos;
using API.SignalR;
using System.Threading.Tasks;
using Application.Profiles;
using Infrastructure.security.soicalAccounts;
using Microsoft.Extensions.Hosting;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureDevelopmentServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt =>
              {
                  opt.UseLazyLoadingProxies();
                  opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
              });
            ConfigureServices(services);
        }

        public void ConfigureProductionServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(opt =>
              {
                  opt.UseLazyLoadingProxies();
                  opt.UseMySql(Configuration.GetConnectionString("DefaultConnection"),
                  mySqlOptions =>
                  {
                      mySqlOptions.EnableRetryOnFailure(
                      maxRetryCount: 10,
                      maxRetryDelay: TimeSpan.FromSeconds(10),
                      errorNumbersToAdd: null);
                  });
              });
            ConfigureServices(services);
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddAuthorization(authopt =>
             {
                 authopt.AddPolicy("IsActivityHost", authpolbuilder =>
                {
                    authpolbuilder.Requirements.Add(new IsHostRequirement());
                });
             });
            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();

            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Application.Activities.Create>());
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader()
                    .AllowAnyMethod()
                    .WithOrigins("http://localhost:3000")
                    .AllowCredentials();
                });
            });
            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddMediatR(typeof(CurrentUser.Handler).Assembly);
            services.AddAutoMapper(typeof(List.Handler).Assembly);

            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();

            services.AddSignalR();

            var key = new SymmetricSecurityKey(Encoding.UTF8.
            GetBytes("Super secret key"));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(Options =>
                {
                    Options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key
                    };
                    Options.Events = new JwtBearerEvents()
                    {
                        OnMessageReceived =
                         (MessageReceivedContext) =>
                         {
                             var accessToken = MessageReceivedContext.Request.Query["access_token"];
                             var path = MessageReceivedContext.Request.Path;
                             if (!string.IsNullOrEmpty(accessToken)
                                && path.StartsWithSegments("/chat"))
                             {
                                 MessageReceivedContext.Token = accessToken;
                             };
                             return Task.CompletedTask;
                         }
                    };
                }
               );

            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.AddScoped<IProfileReader, ProfileReader>();
            services.AddScoped<IGoogleAccessor, GoogleAccessor>();
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();

            if (env.IsDevelopment())
            {
                //  app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            // app.UseHttpsRedirection();

            // app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials());
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors("CorsPolicy");
            app.UseAuthentication();
            app.UseAuthorization();
            // app.UseMvc();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers(); endpoints.MapHub<ChatHub>("/chat"); endpoints.MapFallbackToController("Index", "Fallback");
            });
        }
    }
}
