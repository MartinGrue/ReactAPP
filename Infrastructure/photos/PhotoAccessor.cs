using System;
using System.Net;
using Application.Errors;
using Application.interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.photos
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly IOptions<CloudinarySettings> cloudinarySettings;
        private Cloudinary cloudinary;

        public PhotoAccessor(IOptions<CloudinarySettings> cloudinarySettings)
        {
            this.cloudinarySettings = cloudinarySettings;
            Account acc = new Account(                
                cloudinarySettings.Value.CloudName,
                cloudinarySettings.Value.ApiKey,
                cloudinarySettings.Value.ApiSecret
            );
            cloudinary = new Cloudinary(acc);
        }
        public string DeletePhoto(string publicPhotoId)
        {
            throw new System.NotImplementedException();
        }

        public PhotoUploadResult UploadPhoto(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream)
                    };
                    uploadResult = cloudinary.Upload(uploadParams);
                }
            }
            else
            {
                throw new RestException(HttpStatusCode.BadRequest,
                 new { Activity = "Filelength is zero" });

            }
            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);

            }
            return new PhotoUploadResult
            {
                PublicId = uploadResult.PublicId,
                Url = uploadResult.SecureUri.AbsoluteUri
            };
        }
    }
}