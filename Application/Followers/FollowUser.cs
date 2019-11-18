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

namespace Application.Followers
{
    public class FollowUser
    {
        public class Command : IRequest
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            public DataContext _context;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;

                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var follower = await _context.Users
                .SingleOrDefaultAsync(p => p.UserName == userAccessor.GetCurrentUsername());

              
                var following = await _context.Users
                .FirstOrDefaultAsync(p => p.UserName == request.UserName);

                if (following == null)
                {
                    throw new RestException(HttpStatusCode.BadRequest,
                    new { activity = "Can not find user to follow" });
                }


                var follow = await _context.FollowerFollowings
                .FirstOrDefaultAsync(p => p.UserAId == follower.Id
                                     && p.UserBId == following.Id);

                if (follow != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest,
                    new { activity = "You already follow this user" });
                }
                var newfollow = new FollowerFollowings
                {
                    UserA = follower,
                    UserB = following
                };

                _context.FollowerFollowings.Add(newfollow);

                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;

                throw new Exception("Problem in add Follow handler");
            }
        }
    }
}