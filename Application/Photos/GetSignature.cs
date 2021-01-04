using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class GetSignature
    {
        public class Command : IRequest<string>
        {
            public IFormFile file { get; set; }

            public string folder { get; set; }
            // public string eager { get; set; }
            public string transformation { get; set; }
            public string api_key { get; set; }
            public string timestamp { get; set; }
            // public bool IsHost { get; set; }

        }

        public class Handler : IRequestHandler<Command, string>
        {
            public DataContext _context;
            private readonly IPhotoAccessor photoAccessor;
            private readonly IUserAccessor userAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                this.userAccessor = userAccessor;
                this.photoAccessor = photoAccessor;
                _context = context;
            }

            public async Task<string> Handle(Command request, CancellationToken cancellationToken)
            {
                var parameters = new Dictionary<string, object>() {
                {"folder", request.folder},
                {"timestamp", request.timestamp},
                {"transformation", request.transformation},
                };
                var signature = photoAccessor.GetSignature(parameters);
                return signature;

                throw new Exception("Problem in get signature Photo handler");
            }
        }
    }
}