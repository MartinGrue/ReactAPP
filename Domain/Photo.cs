namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string AppUserId { get; set; }

        //This reference navigation is not needed to construct the one-to-many relation with AppUser. 
        //If uncomment it will cause a circular reference with Profile, because Profile contains Photos
        //which contain AppUser, which contain Photos usw.
        // public virtual AppUser AppUser { get; set; }
    }
}
