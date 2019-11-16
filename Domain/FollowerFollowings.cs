namespace Domain
{
    public class FollowerFollowings
    {
        
        public string UserAId { get; set; }
        public virtual  AppUser UserA { get; set; }
        public string UserBId { get; set; }
        public virtual AppUser UserB { get; set; }
    }
}