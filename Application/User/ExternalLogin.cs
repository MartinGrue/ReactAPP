using System;
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
    public class ExternalLogin
    {
        public class Query : IRequest<User>
        {
            public string Token { get; set; }
            public string Provider { get; set; }
        }
        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> userManager;
            private readonly IGoogleAccessor goolgeAccessor;
            private readonly IJwtGenerator jwtGenerator;

            public Handler(UserManager<AppUser> userManager,
             IGoogleAccessor goolgeAccessor,
              IJwtGenerator jwtGenerator)
            {
                this.goolgeAccessor = goolgeAccessor;
                this.jwtGenerator = jwtGenerator;
                this.userManager = userManager;
            }
            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                var userInfo = new ExternalUserInfo();
                if (request.Provider == "google")
                {
                    userInfo = await goolgeAccessor.GoogleLogin(request.Token);

                    if (userInfo == null)
                        throw new RestException(HttpStatusCode.BadRequest, new { User = "Problem validating token" });
                }
                else
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { User = "Problem with provider name" });
                }


                var user = await userManager.FindByEmailAsync(userInfo.Email);

                if (user == null)
                {
                    user = new AppUser
                    {
                        DisplayName = userInfo.Name,
                        Email = userInfo.Email,
                        UserName = userInfo.Name.Replace(" ", String.Empty)
                    };

                    var result = await userManager.CreateAsync(user);
                    if (!result.Succeeded)
                        throw new RestException(HttpStatusCode.BadRequest
                        , new { User = "Problem creating user" });
                }

                return new User
                {
                    DisplayName = user.DisplayName,
                    Token = jwtGenerator.CreateToken(user),
                    UserName = user.UserName,
                    Image = null
                };
            }
        }
    }
}