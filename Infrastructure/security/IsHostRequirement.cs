using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure.security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }
    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly DataContext context;
        private readonly IHttpContextAccessor httpContextAccessor;
        public IsHostRequirementHandler(IHttpContextAccessor httpContextAccessor, DataContext context)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.context = context;

        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext authHandlercontext, IsHostRequirement requirement)
        {
            var username = httpContextAccessor.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            // var activityId = Guid.Parse(authContext.RouteData.Values["id"].ToString());
            var activityId = Guid.Parse(httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value.ToString());

            var activityFromRepo = context.Activities.FindAsync(activityId).Result;
            var host = activityFromRepo.UserActivities.FirstOrDefault(x => x.IsHost);

            if (host?.AppUser?.UserName == username)
            {
                authHandlercontext.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}