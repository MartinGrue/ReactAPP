using System;
using System.Threading.Tasks;
using Application.Activities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    public class ActivitiesController : BaseController
    {

        [HttpGet("{id}")]
        public async Task<ActionResult<ActivityDTO>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpGet]
        public async Task<ActionResult<List.ActivitiesEnvelope>> List(int? limit, int? offset,
         bool isGoing, bool isHost, DateTime? startDate)
        {
            return await Mediator.Send(new List.Query
            {
                Limit = limit,
                Offset = offset,
                IsGoing = isGoing,
                IsHost = isHost,
                StartDate = startDate
            });
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpPut("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Update(Guid id, Update.Command command)
        {
            command.Id = id;

            return await Mediator.Send(command);
        }
        [HttpDelete("{id}")]
        [Authorize(Policy = "IsActivityHost")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            // Delete.Command command = new Delete.Command{Id = id};

            return await Mediator.Send(new Delete.Command { Id = id });
        }
        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Join(Guid id)
        {
            return await Mediator.Send(new JoinActivity.Command { Id = id });
        }

        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> UnJoin(Guid id)
        {
            return await Mediator.Send(new UnJoinActivity.Command { Id = id });
        }
    }
}