using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class JoinActivity
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                _context = context;
            }

            public DataContext _context { get; }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound,
                     new { Activity = "Could not found Activity" });
                }

                var user = await _context.Users
                .SingleOrDefaultAsync(p => p.UserName == userAccessor.GetCurrentUsername());

                var join = await _context.UserActivity
                .SingleOrDefaultAsync(p => p.AppUserId == user.Id && p.ActivityId == request.Id);

                if (join != null)
                {
                    throw new RestException(HttpStatusCode.NotFound,
                     new { Activity = "Already joined this activity" });
                }
                var newjoin = new UserActivity {
                    AppUser = user,
                    Activity = activity,
                    DateJoined = DateTime.Now,
                    IsHost = false
                };

                _context.UserActivity.Add(newjoin);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem in join activity handler");
            }
        }
    }
}