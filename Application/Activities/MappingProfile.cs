using System.Linq;
using Application.Followers;
using Application.Photos;
using AutoMapper;
using Domain;
namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityJSON>();
            CreateMap<UserActivity, UserActivityJSON>();

            CreateMap<AppUser, UserJSON>();
            CreateMap<Photo, PhotoJSON>().ForMember(d => d.AppUserId, o => o.Equals("a"));

            CreateMap<FollowerFollowings, FollowerFollowingsJSON>();
            CreateMap<Activity, ActivityDTO>();
            CreateMap<UserActivity, AttendeeDTO>()
            .ForMember(d => d.UserName, o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
            .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());
        }
    }
}