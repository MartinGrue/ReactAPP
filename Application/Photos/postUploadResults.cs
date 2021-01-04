using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class postUploadResults
    {
        public class Command : IRequest<Photo>
        {
            public PhotoUploadResult Result { get; set; }
        }

        public class Handler : IRequestHandler<Command, Photo>
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

            public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.SingleOrDefaultAsync(p => p.UserName == userAccessor.GetCurrentUsername());


                var photo = new Photo
                {
                    Id = request.Result.PublicId,
                    Url = request.Result.Url.ToString()
                };
                 if (!user.Photos.Any(p => p.IsMain))
                {
                    photo.IsMain = true;
                }
                user.Photos.Add(photo);
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return photo;

                throw new Exception("Problem in add Photo handler");
            }
        }
    }
}