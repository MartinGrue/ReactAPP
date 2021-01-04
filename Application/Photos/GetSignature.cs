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
            // public string file { get; set; }
            public string api_key { get; set; }
            public string timestamp { get; set; }
            // public bool IsHost { get; set; }
            public IFormFile file { get; set; }

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
                // "transformation", "w_500,h_500,c_fill"  
                var parameters = new Dictionary<string, object>() {
                { "file", request.file },
                {"timestamp", request.timestamp},
                { "api_key", request.api_key },};

                var signature = photoAccessor.GetSignature(parameters);
                return signature;

                throw new Exception("Problem in get signature Photo handler");
            }
        }
    }
}