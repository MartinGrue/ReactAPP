using System;
using System.Linq;
using System.Threading.Tasks;
using Application.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Persistence;

namespace Infrastructure.security
{
    public class IsHostRequirement : IAuthorizationRequirement
    {
    }
    public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
    {
        private readonly IUserAccessor userAccessor;
        private readonly DataContext datacontext;
        public IsHostRequirementHandler(DataContext datacontext, IUserAccessor userAccessor)
        {
            this.datacontext = datacontext;
            this.userAccessor = userAccessor;

        }
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
        {
            if (context.Resource is AuthorizationFilterContext authContext)
            {
                var username = userAccessor.GetCurrentUsername();
                var activityId = Guid.Parse(authContext.RouteData.Values["id"].ToString());
                // var activityFromRepo = datacontext.Activities
                // .SingleOrDefault(p => p.Id == activityId);
                var activityFromRepo = datacontext.Activities.FindAsync(activityId).Result;
                var host = activityFromRepo.UserActivities.FirstOrDefault(x => x.IsHost);

                if (host?.AppUser?.UserName == username)
                {
                    context.Succeed(requirement);
                }
                else
                {
                    context.Fail();
                }
            }
            return Task.CompletedTask;
        }
    }
}