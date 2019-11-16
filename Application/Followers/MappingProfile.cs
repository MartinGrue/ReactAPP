using AutoMapper;

namespace Application.Followers
{
    public class MappingProfile :Profile
    {
        public MappingProfile(){
         CreateMap<Application.Profiles.Profile, ProfileForFollowersDto>();
        }
    }
}