using System;
using System.IO;
using System.Net;
using Application.Errors;
using Application.interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Domain;
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
            var deletionParams = new DeletionParams(publicPhotoId);
            var result = cloudinary.Destroy(deletionParams);
            return result.Result == "ok" ? result.Result : null;
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
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
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
        public Photo GetPhotoFromUrl(string url, bool isMain)
        {
            var uploadResult = new ImageUploadResult();
            if (url.Length > 0)
            {
                Stream stream = null;
                HttpWebRequest aRequest = (HttpWebRequest)WebRequest.Create(url);
                HttpWebResponse aResponse = (HttpWebResponse)aRequest.GetResponse();
                using (StreamReader sReader = new StreamReader(aResponse.GetResponseStream(), System.Text.Encoding.Default))
                {
                    stream = sReader.BaseStream;
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription("image", stream),
                        Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = cloudinary.Upload(uploadParams);
                }
            } else
            {
                throw new RestException(HttpStatusCode.BadRequest,
                 new { Activity = "Filelength is zero" });

            }
            if (uploadResult.Error != null)
            {
                throw new Exception(uploadResult.Error.Message);

            }

            return new Photo
            {
                Id = uploadResult.PublicId,
                Url = uploadResult.SecureUri.AbsoluteUri,
                IsMain = isMain
            };
        }
    }
}