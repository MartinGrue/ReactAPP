﻿
using API.Middleware;
using Application.Activities;
using Domain;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
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
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.AspNetCore.Authentication;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using System.IdentityModel.Tokens.Jwt;
using Infrastructure.security.soicalAccounts;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

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
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseLazyLoadingProxies();
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddMvc(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
            .AddFluentValidation(cfg => cfg.RegisterValidatorsFromAssemblyContaining<Application.Activities.Create>())
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
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
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
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


            app.UseAuthentication();
            app.UseCors("CorsPolicy");
            // app.UseMvc();

            app.UseSignalR(configure => { configure.MapHub<ChatHub>("/chat"); });
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc(routes => routes.MapSpaFallbackRoute(name: "spa-fallback",
            defaults: new { controller = "Fallback", action = "Index" }));
        }
    }
}
