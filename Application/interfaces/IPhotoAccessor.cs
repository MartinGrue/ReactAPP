using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.interfaces
{
    public interface IPhotoAccessor
    {
        PhotoUploadResult UploadPhoto(IFormFile file);
        string DeletePhoto(string publicPhotoId);    
    }
}