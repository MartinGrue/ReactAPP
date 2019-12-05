using System.Threading.Tasks;
using Application.User;

namespace Application.interfaces
{
    public interface IGoogleAccessor
    {
        Task<GoogleUserInfo> GoogleLogin(string accessToken);

    }
}