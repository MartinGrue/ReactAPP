using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Update
    {
        public class Command : MediatR.IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
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
                if(activityFromRepo == null){
                    throw new Exception("Could not find Activity to update");
                }
                // activityFromRepo.Title = request.Title;
                // activityFromRepo.Description = request.Description;
                // activityFromRepo.Category = request.Category;
                // activityFromRepo.Date = request.Date;
                // activityFromRepo.City = request.City;
                // activityFromRepo.Venue = request.Venue;
                activityFromRepo.Title = request.Title ?? activityFromRepo.Title;
                activityFromRepo.Description = request.Description ?? activityFromRepo.Description;
                activityFromRepo.Category = request.Category ?? activityFromRepo.Category;
                activityFromRepo.Date = request.Date ?? activityFromRepo.Date;
                activityFromRepo.City = request.City ?? activityFromRepo.City;
                activityFromRepo.Venue = request.Venue ?? activityFromRepo.Venue;
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem in update handler");
            }
        }
    }
}