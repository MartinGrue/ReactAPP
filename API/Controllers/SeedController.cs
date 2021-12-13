
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
using AutoMapper;

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
        private readonly IMapper _mapper;
        public SeedController(DataContext context, UserManager<AppUser> userManager,
         IPhotoAccessor photoAccessor, IWebHostEnvironment HostEnvironment, IMapper mapper)
        {
            _hostEnvironment = HostEnvironment;
            _context = context;
            _userManager = userManager;
            _photoAccessor = photoAccessor;
            _mapper = mapper;
        }
        [HttpGet("reseed")]
        public async Task<IActionResult> Reseed()
        {
            if (_hostEnvironment.IsDevelopment())
            {
                if (_userManager.Users.Any())
                {
                    if (await SmallSeed.PurgeDb(_context, _userManager, _photoAccessor))
                    {
                        if (await SmallSeed.ReSeedData(_context, _userManager, _photoAccessor, _mapper))
                        {
                            return Ok();
                        }
                        return BadRequest("Failed to reseed database after purge");
                        // }
                    }
                    return BadRequest("Failed to purge database");
                }
                if (await SmallSeed.ReSeedData(_context, _userManager, _photoAccessor, _mapper))
                {
                    return Ok();
                }
            }
            return NotFound();
        }
    }
}
