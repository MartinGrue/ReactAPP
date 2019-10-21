using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            public Handler(DataContext context)
            {
                _context = context;
            }

            public DataContext _context { get; }
            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activityFromRepo = await _context.Activities.FirstOrDefaultAsync(p => p.Id == request.Id);

                if (activityFromRepo == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Could not find Activity" });
                }
                return activityFromRepo;
            }
        }
    }
}