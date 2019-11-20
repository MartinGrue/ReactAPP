namespace Application.Followers
{
    public class ProfileForFollowersDto
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string UserName { get; set; }
        public string Image { get; set; }
        public bool isFollowed { get; set; }
        public int FollowersCount { get; set; }
        public int FollowingCount { get; set; }
    }
}