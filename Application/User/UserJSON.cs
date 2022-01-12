using System.Collections.Generic;
using Application.Photos;

namespace Domain
{
    public class UserJSON
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public List<PhotoJSON> Photos { get; set; }
    }
}