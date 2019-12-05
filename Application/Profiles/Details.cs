using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;

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
            private readonly IProfileReader profileReader;
            public Handler(IProfileReader profileReader)
            {
                this.profileReader = profileReader;
            }

            public async Task<Profile> Handle(Query request, CancellationToken cancellationToken)
            {
                return await profileReader.ReadProfile(request.UserName);

                throw new Exception("Problem in profile-details handler");
            }
        }
    }
}




