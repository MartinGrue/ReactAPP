using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Application.interfaces;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API
{
    public class SeedData
    {
        public List<AppUser> users { get; set; }
        public List<Activity> activities { get; set; }
        public List<FollowerFollowings> followerFollowings { get; set; }
    }
    public static class SmallSeed
    {
        static string workingDirectory = Environment.CurrentDirectory;
        static string projectDirectory = Directory.GetParent(workingDirectory).FullName;
        static string datafile = System.IO.Path.Combine(projectDirectory, @"data/seedData.json");
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            string jsonString = File.ReadAllText(datafile);
            SeedData seeddata = JsonSerializer.Deserialize<SeedData>(jsonString);

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>();
                foreach (var user in seeddata.users)
                {
                    var photos = new List<Photo>();

                    foreach (var photo in seeddata.users[0].Photos)
                    {
                        photos.Add(photoAccessor.GetPhotoFromUrl(photo.Url, photo.IsMain));
                    }
                    users.Add(new AppUser
                    {
                        Id = user.Id,
                        DisplayName = user.DisplayName,
                        UserName = user.UserName,
                        Email = user.Email,
                        Photos = photos
                    });
                }

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

            }
            if (!context.Activities.Any())
            {
                var activities = new List<Activity>();
                foreach (var activity in seeddata.activities)
                {
                    var userActivities = new List<UserActivity>();
                    foreach (var useractivity in activity.UserActivities)
                    {
                        userActivities.Add(new UserActivity
                        {
                            AppUserId = useractivity.AppUserId,
                            IsHost = useractivity.IsHost,
                            DateJoined = useractivity.DateJoined
                        });
                    }
                    activities.Add(new Activity
                    {
                        Title = activity.Title,
                        Date = activity.Date,
                        Description = activity.Description,
                        Category = activity.Category,
                        City = activity.City,
                        Latitute = activity.Latitute,
                        Longitute = activity.Latitute,
                        Venue = activity.Venue,
                        UserActivities = userActivities

                    });
                }

                await context.Activities.AddRangeAsync(activities);
            }
            if (!context.FollowerFollowings.Any())
            {
                var FollowerFollowings = new List<FollowerFollowings>();
                foreach (var followerFollowing in seeddata.followerFollowings)
                {

                    FollowerFollowings.Add(new FollowerFollowings { UserAId = followerFollowing.UserAId, UserBId = followerFollowing.UserBId });
                }
                await context.FollowerFollowings.AddRangeAsync(FollowerFollowings);
            }

            await context.SaveChangesAsync();
        }
    }
}