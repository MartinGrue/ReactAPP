using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User>{}
         //Return a User object
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IUserAccessor userAccessor;
            private readonly IJwtGenerator jwtGenerator;
            public Handler(UserManager<AppUser> userManager, IJwtGenerator jwtGenerator, IUserAccessor userAccessor)
            {
                this.jwtGenerator = jwtGenerator;
                this.userAccessor = userAccessor;
                this.userManager = userManager;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await userManager.FindByNameAsync(userAccessor.GetCurrentUsername());
                if (user == null)
                {
                    throw new RestException(HttpStatusCode.NotFound);
                }
                //TODO: generate token
                return new User
                {
                    DisplayName = user.DisplayName,
                    Username = user.UserName,
                    Image = "bla",
                    Token = this.jwtGenerator.CreateToken(user)
                };
                //TODO throw with restexception error + statuscode
            }
        }
    }
}