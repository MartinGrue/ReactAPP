using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.interfaces;
using Application.User;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Route("[controller]/[action]")]
    [AllowAnonymous]
    public class SocialAccountController : Controller
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly IUserAccessor userAccessor;
        private readonly IJwtGenerator jwtGenerator;

        public SocialAccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IUserAccessor userAccessor, IJwtGenerator jwtGenerator)
        {
            this.userAccessor = userAccessor;
            this.jwtGenerator = jwtGenerator;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        [HttpGet]
        public IActionResult Login(string provider, string returnUrl = null)
        {
            var redirectUrl = Url.Action("Callback", "SocialAccount");
            var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            var result = new ChallengeResult(provider, properties);
            return result;
        }
        [HttpGet]
        public async Task<ActionResult<User>> Callback(string returnUrl = null, string remoteError = null)
        {
            returnUrl = returnUrl ?? Url.Content("~/");
            if (remoteError != null)
            {
                // return RedirectToPage("./", new { ReturnUrl = returnUrl });
                return Ok();
            }

            var info = await signInManager.GetExternalLoginInfoAsync();
            if (info == null)
            {
                // return RedirectToPage("./", new { ReturnUrl = returnUrl });
                return Ok();
            }

            // Sign in the user with this external login provider if the user already has a login.
            var result = await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey,
                isPersistent: false, bypassTwoFactor: true);
            if (result.Succeeded)
            {
                // return LocalRedirect(returnUrl);
                return Ok();
            }

            var userEmail = info.Principal.FindFirstValue(ClaimTypes.Email);

            if (string.IsNullOrEmpty(userEmail))
            {
                // return LocalRedirect(
                //     $"{returnUrl}?message=Email scope access is required to add {info.ProviderDisplayName} provider&type=danger");
                return Ok();
            }

            var userDb = await userManager.FindByEmailAsync(userEmail);
            var appuser = new AppUser
            {
                DisplayName = userEmail,
                Email = userEmail,
                UserName = userEmail
            };

            if (userDb == null)
            {



                // Add the external provider
                var createUserResult = await userManager.CreateAsync(appuser);
                Claim trialClaim = new Claim("Trial", DateTime.Now.ToString());
                await userManager.AddClaimAsync(appuser, trialClaim);

                createUserResult =
                    await userManager.AddLoginAsync(appuser,
                        new ExternalLoginInfo(null, info.LoginProvider, info.ProviderKey,
                            info.ProviderDisplayName));

                if (createUserResult.Succeeded)
                {
                    await signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, false);

                    return new User
                    {
                        DisplayName = appuser.DisplayName,
                        UserName = appuser.UserName,
                        Token = this.jwtGenerator.CreateToken(appuser),
                        Image = null
                    };
                }
                return Ok();
            }

            return new User
            {
                DisplayName = appuser.DisplayName,
                UserName = appuser.UserName,
                Token = this.jwtGenerator.CreateToken(appuser),
                Image = null
            };
        }
    }
}