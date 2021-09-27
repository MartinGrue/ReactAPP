
using System;
using System.ComponentModel;
using System.Threading.Tasks;
using Application.interfaces;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Persistence;
using System.Collections.Generic;
using System.Linq;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class SeedController : BaseController
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IPhotoAccessor _photoAccessor;
        public SeedController(DataContext context, UserManager<AppUser> userManager,
         IPhotoAccessor photoAccessor, IWebHostEnvironment HostEnvironment)
        {
            _hostEnvironment = HostEnvironment;
            _context = context;
            _userManager = userManager;
            _photoAccessor = photoAccessor;
        }
        // [HttpGet("purge")]
        // public async Task<IActionResult> Purge()
        // {
        //     if (_hostEnvironment.IsDevelopment())
        //     {
        //         if (_userManager.Users.Any())
        //         {
        //             if (await SmallSeed.PurgeDb(_context, _userManager, _photoAccessor))
        //             {

        //                 return Ok();
        //             }
        //             return BadRequest("Failed to purge Database user");
        //         }
        //     }
        //     return NotFound();
        // }
        // POST api/seed
        [HttpGet("reseed")]
        public async Task<IActionResult> Reseed()
        {
            if (_hostEnvironment.IsDevelopment())
            {
                if (_userManager.Users.Any())
                {
                    if (await SmallSeed.PurgeDb(_context, _userManager, _photoAccessor))
                    {
                        if (await SmallSeed.ReSeedData(_context, _userManager, _photoAccessor))
                        {
                            return Ok();
                        }
                        return BadRequest("Failed to reseed Database after purge");
                        // }
                    }
                    return BadRequest("Failed to reseed Database while purging");
                }
                if (await SmallSeed.ReSeedData(_context, _userManager, _photoAccessor))
                {
                    return Ok();
                }
            }
            return NotFound();
        }
    }
}
