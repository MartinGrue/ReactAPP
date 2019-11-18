using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class ActivitiesEnvelope
        {
            public List<ActivityDTO> Activities { get; set; }
            public int ActivityCount { get; set; }
        }
        public class Query : IRequest<ActivitiesEnvelope>
        {
            public int? Limit { get; set; }
            public int? Offset { get; set; }
            public bool IsGoing { get; set; }
            public bool IsHost { get; set; }
            public DateTime? StartDate { get; set; }
            // public DateTime? StartDate { get { return StartDate; } set { StartDate = value ?? DateTime.Now; } }
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _mapper = mapper;
                UserAccessor = userAccessor;
                _context = context;
            }

            public DataContext _context { get; }
            public IUserAccessor UserAccessor { get; }

            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .FirstOrDefaultAsync(p => p.UserName == UserAccessor.GetCurrentUsername());

                var queryable = _context.Activities
                .Where(a => a.Date >= request.StartDate)
                .OrderBy(p => p.Date)
                .AsQueryable();

                if (request.IsHost)
                {
                    queryable = queryable
                    .Where(x => x.UserActivities
                    .Any(p => p.AppUser == user && p.IsHost));
                }
                if (request.IsGoing)
                {
                    queryable = queryable
                    .Where(x => x.UserActivities
                    .Any(p => p.AppUser == user));
                }

                var activities = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? 3).ToListAsync();
                return new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDTO>>(activities),
                    ActivityCount = queryable.Count()
                };

            }
        }
    }
}