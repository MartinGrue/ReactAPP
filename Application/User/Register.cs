using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Application.Validators;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string DisplayName { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }
        public class CommandValidatior : AbstractValidator<Command>
        {
            public CommandValidatior()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
                RuleFor(x => x.UserName).NotEmpty();
                RuleFor(x => x.Email).NotEmpty().EmailAddress();
                RuleFor(x => x.Password).Password();
            }
            public class Handler : IRequestHandler<Command, User>
            {
                private readonly UserManager<AppUser> userManager;
                private readonly SignInManager<AppUser> signInManager;
                private readonly IJwtGenerator jwtGenerator;
                private readonly DataContext context;
                public Handler(DataContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
                {
                    this.context = context;
                    this.jwtGenerator = jwtGenerator;
                    this.signInManager = signInManager;
                    this.userManager = userManager;
                }

                public async Task<User> Handle(Command request, CancellationToken cancellationToken)
                {
                    if (await userManager.Users.Where(p => p.Email == request.Email).AnyAsync())
                    {
                        throw new RestException(HttpStatusCode.BadRequest, new { Email = "Email already exists" });
                    }
                    if (await userManager.Users.Where(p => p.UserName == request.UserName).AnyAsync())
                    {
                        throw new RestException(HttpStatusCode.BadRequest, new { UserName = "UserName already exists" });
                    }
                    var user = new AppUser
                    {
                        DisplayName = request.DisplayName,
                        Email = request.Email,
                        UserName = request.UserName
                    };
                    var result = await userManager.CreateAsync(user, request.Password);

                    if (result.Succeeded)
                    {
                        return new User
                        {
                            DisplayName = user.DisplayName,
                            Username = user.UserName,
                            Token = this.jwtGenerator.CreateToken(user),
                            Image = null
                        };
                    }
                    throw new Exception("Problem in registration handler");
                }
            }

        }
    }
}