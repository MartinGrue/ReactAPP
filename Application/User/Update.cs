using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.User
{
    public class Update
    {
        public class Command : MediatR.IRequest<User>
        {
            public string Bio { get; set; }
            public string DisplayName { get; set; }
        }
        public class CommandValidatior : AbstractValidator<Command>
        {
            public CommandValidatior()
            {
                RuleFor(x => x.DisplayName).NotEmpty();
            }
        }
        public class Handler : IRequestHandler<Command, User>
        {
            private readonly IUserAccessor userAccessor;
            private readonly UserManager<AppUser> userManager;
            private readonly IJwtGenerator jwtGenerator;
            public Handler(DataContext context, IUserAccessor userAccessor, UserManager<AppUser> userManager, IJwtGenerator jwtGenerator)
            {
                this.jwtGenerator = jwtGenerator;
                this.userManager = userManager;
                this.userAccessor = userAccessor;
                _context = context;
            }

            public DataContext _context { get; }

            public async Task<User> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .SingleOrDefaultAsync(p => p.UserName == userAccessor.GetCurrentUsername());

                // var appUser = await userManager.Users
                // .SingleOrDefaultAsync(p => p.UserName == userAccessor.GetCurrentUsername());

                user.DisplayName = request.DisplayName;

                if (request.Bio != null)
                {
                    user.Bio = request.Bio;
                }

                var success = await _context.SaveChangesAsync() > 0;
                if (success)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        UserName = user.UserName,
                        Token = this.jwtGenerator.CreateToken(user),
                        Image = user.Photos.FirstOrDefault(p => p.IsMain)?.Url
                    };
                }
                throw new Exception("Problem in user update handler");
            }
        }
    }
}