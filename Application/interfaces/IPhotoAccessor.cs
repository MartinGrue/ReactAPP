using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.interfaces
{
    public interface IPhotoAccessor
    {
        PhotoUploadResult UploadPhoto(IFormFile file);
        string DeletePhoto(string publicPhotoId);

        Photo GetPhotoFromUrl(string url, bool isMain);
    }
}