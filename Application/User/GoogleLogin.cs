using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class GoogleLogin
    {
        public class Query  : IRequest {}
        public class Handler : IRequestHandler<Query>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly SignInManager<AppUser> signInManager;
            private readonly IUserAccessor userAccessor;
            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser>  signInManager, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.userManager = userManager;
                this.signInManager = signInManager;
            }
            public async Task<Unit> Handle(Query request, CancellationToken cancellationToken)
            {
                // var authenticationProperties = signInManager.ConfigureExternalAuthenticationProperties("Google", "http://localhost:3000");
                // var challenge = Challenge(authenticationProperties, "Google");


                // var user = await userManager.FindByNameAsync(userAccessor.GetCurrentUsername());
                // if (user == null)
                // {
                //     throw new RestException(HttpStatusCode.NotFound);
                // }
                //TODO: generate token
                 return Unit.Value;

                //TODO throw with restexception error + statuscode
            }
        }
    }
}