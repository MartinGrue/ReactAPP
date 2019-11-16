using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class GetFollowing
    {
        public class Command : IRequest<List<Profile>>
        {
            public string UserName { get; set; }
            public string followingORfollowers { get; set; }
        }

        public class Handler : IRequestHandler<Command, List<Profile>>
        {
            public DataContext _context;
            private readonly IProfileReader profileReader;

            public Handler(DataContext context, IProfileReader profileReader)
            {
                this.profileReader = profileReader;
                _context = context;
            }

            public async Task<List<Profile>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .FirstOrDefaultAsync(p => p.UserName == request.UserName);

                var userList = new List<Profile>();
                if (request.followingORfollowers == "followers")
                {
                    var users = user.Followers;
                    foreach (var item in users)
                    {
                        var profile = await profileReader.ReadProfile(item.UserA.UserName);
                        userList.Add(profile);
                    }
                }
                else if (request.followingORfollowers == "following")
                {
                    var users = user.Followings;
                    foreach (var item in users)
                    {
                        var profile = await profileReader.ReadProfile(item.UserB.UserName);
                        userList.Add(profile);
                    }
                }
                else
                {
                    {
                        throw new RestException(HttpStatusCode.BadRequest);
                    }
                }

                return userList;

                throw new Exception("Problem in add Follow handler");
            }
        }
    }
}