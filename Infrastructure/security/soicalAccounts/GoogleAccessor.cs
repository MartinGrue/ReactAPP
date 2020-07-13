using System.Net.Http;
using System.Threading.Tasks;
using Application.interfaces;
using Application.User;
using Google.Apis.Auth;

namespace Infrastructure.security.soicalAccounts
{
    public class GoogleAccessor : IGoogleAccessor
    {
        public async Task<GoogleUserInfo> GoogleLogin(string accessToken)
        {
            var validPayload = await GoogleJsonWebSignature.ValidateAsync(accessToken);
            if (validPayload == null)
            {
                return null;
            }
             return new GoogleUserInfo{
                 Name =validPayload.Name,
                 Email = validPayload.Email
             };
        }
    }
}