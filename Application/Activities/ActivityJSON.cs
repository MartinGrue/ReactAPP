using System;
using System.Collections.Generic;
using Application.Comments;
using Domain;

namespace Application.Activities
{
    public class ActivityJSON
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public double Latitute { get; set; }
        public double Longitute { get; set; }
        public IList<UserActivityJSON> UserActivities { get; set; }
        // public ICollection<CommentDTO> Comments { get; set; }
    }
}