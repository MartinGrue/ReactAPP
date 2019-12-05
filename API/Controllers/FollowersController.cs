using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Followers;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/Profiles")]

    public class FollowersController : BaseController
    {
        [HttpPost("{username}/follow")]
        public async Task<ActionResult<Unit>> Follow(string username)
        {
            return await Mediator.Send(new FollowUser.Command { UserName = username });
        }

        [HttpPost("{username}/unfollow")]
        public async Task<ActionResult<Unit>> UnFollow(string username)
        {
            return await Mediator.Send(new UnFollowUser.Command { UserName = username });
        }

        [HttpGet("{username}/follow")]
        public async Task<ActionResult<List<ProfileForFollowersDto>>> GetFollowingORfollowers(string username, string predicate)
        {
            return await Mediator.Send(new GetFollowing.Command { UserName = username, followingORfollowers = predicate });
        }
    }
}