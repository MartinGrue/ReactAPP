using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<Profile>
        {
            public string UserName { get; set; }
        }

        public class Handler : IRequestHandler<Query, Profile>
        {
            public Handler(DataContext context)
            {
                _context = context;
            }

            public DataContext _context { get; }

            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                // var user = _context.Users.FirstOrDefault(p => p.UserName == request.UserName);
                var user = await _context.Users.SingleOrDefaultAsync(p => p.UserName == request.UserName);

                return new Profile
                {
                    UserName = user.UserName,
                    DisplayName = user.DisplayName,
                    Image = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
                    Photos = user.Photos,
                    Bio = user.Bio
                };
                throw new Exception("Problem in profile-details handler");
            }
        }
    }
}




