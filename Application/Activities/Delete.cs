using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public Handler(DataContext context)
            {
                _context = context;
            }

            public DataContext _context { get; }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityFromRepo = await _context.Activities.FirstOrDefaultAsync(p => p.Id == request.Id);
                if (activityFromRepo == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Could not find Activity to delete" });
                }
                _context.Activities.Remove(activityFromRepo);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem in update handler");
            }
        }
    }
}