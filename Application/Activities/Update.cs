using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using FluentValidation;
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
            public DateTime Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }
        public class CommandValidatior : AbstractValidator<Command>
        {
            public CommandValidatior()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();
            }
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
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Could not find Activity to update" });
                }
                
                activityFromRepo.Title = request.Title;
                activityFromRepo.Description = request.Description;
                activityFromRepo.Category = request.Category;
                activityFromRepo.Date = request.Date;
                activityFromRepo.City = request.City;
                activityFromRepo.Venue = request.Venue;

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem in update handler");
            }
        }
    }
}