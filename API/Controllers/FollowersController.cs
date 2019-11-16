using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Followers;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/Profiles")]

    public class FollowersController : BaseController
    {
        [HttpPost("{username}/follow")]
        public async Task<ActionResult<Unit>> Upload(string username)
        {
            await Task.Delay(1000);
            return await Mediator.Send(new FollowUser.Command { UserName = username });
        }
        [HttpGet("{username}/follow")]
        public async Task<ActionResult<List<Profile>>> GetFollowingORfollowers(string username, string predicate)
        {
            await Task.Delay(1000);
            return await Mediator.Send(new GetFollowing.Command { UserName = username, followingORfollowers = predicate });
        }
    }
}