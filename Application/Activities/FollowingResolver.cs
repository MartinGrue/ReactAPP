using System.Linq;
using Application.interfaces;
using AutoMapper;
using Domain;
using Persistence;

namespace Application.Activities
{
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDTO, bool>
    {
        private readonly IUserAccessor userAccessor;
        private readonly DataContext datacontext;
        public FollowingResolver(DataContext datacontext, IUserAccessor userAccessor)
        {
            this.datacontext = datacontext;
            this.userAccessor = userAccessor;
        }

        public bool Resolve(UserActivity source, AttendeeDTO destination, bool destMember, ResolutionContext context)
        {
            var loggedInUser = datacontext.Users
               .SingleOrDefault(p => p.UserName == userAccessor.GetCurrentUsername());
            var requestedUser = source.AppUser;

            if (loggedInUser.Followings.Any(x => x.UserB.Id == requestedUser.Id))
            {
                return true;
            }
            return false;
        }
    }
}