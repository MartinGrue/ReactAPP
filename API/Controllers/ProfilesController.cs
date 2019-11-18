using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> GetProfile(string username)
        {
            return await Mediator.Send(new Details.Query { UserName = username });
        }

        [HttpGet("{username}/activities")]
        public async Task<ActionResult<List<UserActivityDto>>> GetActivitiesForProfile(string username, string predicate)
        {
           await Task.Delay(3000);
            return await Mediator.Send(new ListActivities.Query { Username = username, Predicate = predicate });
        }
    }
}