using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDTO>
        {
            public Guid Id { get; set; } //ActivityId
            public string UserName { get; set; }
            public string Body { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDTO>
        {
            private readonly IMapper mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                this.mapper = mapper;

                _context = context;
            }

            public DataContext _context { get; }

            public async Task<CommentDTO> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .SingleOrDefaultAsync(p => p.UserName == request.UserName);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                var activity = await _context.Activities
                .SingleOrDefaultAsync(p => p.Id == request.Id);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound,
                     new { Activity = "Could not found Activity" });
                }
                var comment = new Comment
                {
                    Body = request.Body,
                    Author = user,
                    Activity = activity,
                    CreatedAt = DateTime.Now
                };

                _context.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return mapper.Map<Comment, CommentDTO>(comment);
                throw new Exception("Problem in create Comment handler");
            }
        }
    }
}