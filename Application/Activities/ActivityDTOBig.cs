using System;
using System.Collections.Generic;
using Application.Comments;

namespace Application.Activities
{
    public class ActivityDTOBig : ActivityDTO
    {
        public ICollection<AttendeeDTO> UserActivities { get; set; }
        public ICollection<CommentDTO> Comments { get; set; }
    }
}