using System.Linq;
using Application.Followers;
using Application.Photos;
using AutoMapper;
using Domain;
namespace Application.Activities
{
    public class MappingProfile : Profile
    // AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityJSON>();
            CreateMap<UserActivity, UserActivityJSON>();

            CreateMap<AppUser, UserJSON>();
            CreateMap<Photo, PhotoJSON>();

            CreateMap<FollowerFollowings, FollowerFollowingsJSON>();
            CreateMap<Activity, ActivityDTO>();
            CreateMap<Activity, ActivityDTOBig>();

            CreateMap<UserActivity, AttendeeDTO>()
            .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());
        }
    }
}