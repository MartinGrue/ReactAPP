using System;

namespace Domain
{
    public class UserActivityJSON
    {
        public string AppUserId { get; set; }
        public Guid ActivityId { get; set; }
        public DateTime DateJoined { get; set; }
        public bool IsHost { get; set; }
    }
}