using System.Linq;
using System.Threading.Tasks;
using Application.interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext context;
        private readonly IUserAccessor userAccessor;
        public ProfileReader(DataContext context, IUserAccessor userAccessor)
        {
            this.userAccessor = userAccessor;
            this.context = context;
        }

        public async Task<Profile> ReadProfile(string username)
        {
            var loggedInUser = await context.Users
            .SingleOrDefaultAsync(p => p.UserName == userAccessor.GetCurrentUsername());
            var requestedUser = await context.Users
            .SingleOrDefaultAsync(p => p.UserName == username);

            var profile = new Profile
            {
                UserName = requestedUser.UserName,
                DisplayName = requestedUser.DisplayName,
                Image = requestedUser.Photos.FirstOrDefault(p => p.IsMain)?.Url,
                Photos = requestedUser.Photos,
                Bio = requestedUser.Bio,
                FollowingCount = requestedUser.Followings.Count(),
                FollwersCount = requestedUser.Followers.Count()
            };
            if (loggedInUser.Followings.Any(x => x.UserB.Id == requestedUser.Id))
            { profile.isFollowed = true; }
            return profile;
        }
    }
}
