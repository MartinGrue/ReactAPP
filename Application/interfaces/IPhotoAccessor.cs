using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.interfaces
{
    public interface IPhotoAccessor
    {
        PhotoUploadResult UploadPhoto(IFormFile file);
        string DeletePhoto(string publicPhotoId);
        Task<string> GetSignature(Dictionary<string, object> parameters);
        Photo GetPhotoFromUrl(string url, bool isMain);
    }
}