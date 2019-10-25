using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{

    public class ActivitiesController : BaseController
    {

        [HttpGet("{id}")]
                [Authorize]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            await Task.Delay(1000);
            return await Mediator.Send(new Details.Query { Id = id });
        }

        [HttpGet]

        public async Task<ActionResult<List<Activity>>> List()
        {
            // Query q = new List.Query();
            // CancellationToken token = new CancellationToken();
            // return await _handler.Handle(q, token );
            await Task.Delay(1000);
            return await Mediator.Send(new List.Query());
        }
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(Guid id, Update.Command command)
        {
            command.Id = id;
            await Task.Delay(1000);
            return await Mediator.Send(command);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            // Delete.Command command = new Delete.Command{Id = id};
            await Task.Delay(1000);
            return await Mediator.Send(new Delete.Command { Id = id });
        }
    }
}