using System;
using System.Collections.Generic;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Profiles;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class GetFollowing
    {
        public class Command : IRequest<List<ProfileForFollowersDto>>
        {
            public string UserName { get; set; }
            public string followingORfollowers { get; set; }
        }

        public class Handler : IRequestHandler<Command, List<ProfileForFollowersDto>>
        {
            public DataContext _context;
            private readonly IProfileReader profileReader;
            private readonly IMapper mapper;

            public Handler(DataContext context, IProfileReader profileReader, IMapper mapper)
            {
                this.mapper = mapper;
                this.profileReader = profileReader;
                _context = context;
            }

            public async Task<List<ProfileForFollowersDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                .FirstOrDefaultAsync(p => p.UserName == request.UserName);

                var userList = new List<ProfileForFollowersDto>();
                if (request.followingORfollowers == "followers")
                {
                    var users = user.Followers;
                    foreach (var item in users)
                    {
                        var profile = await profileReader.ReadProfile(item.UserA.UserName);
                        var profileToReturn = mapper.Map<Profiles.Profile, ProfileForFollowersDto>(profile);
                        userList.Add(profileToReturn);
                    }
                }
                else if (request.followingORfollowers == "following")
                {
                    var users = user.Followings;
                    foreach (var item in users)
                    {
                        var profile = await profileReader.ReadProfile(item.UserB.UserName);
                        var profileToReturn = mapper.Map<Profiles.Profile, ProfileForFollowersDto>(profile);
                        userList.Add(profileToReturn);
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