using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Activities;
using Application.interfaces;
using AutoMapper;
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
        private static SeedData GetSeedFromJson()
        {
            string workingDirectory = Environment.CurrentDirectory;
            string projectDirectory = Directory.GetParent(workingDirectory).FullName;
            string datafile = System.IO.Path.Combine(projectDirectory, @"data/database.json");
            string jsonString = File.ReadAllText(datafile);
            return JsonSerializer.Deserialize<SeedData>(jsonString);
        }
        private static SeedData JsonData = GetSeedFromJson();
        public static async Task Seed(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor, IMapper mapper)
        {
            if (!userManager.Users.Any())
            {
                await SeedUsers(context, userManager, photoAccessor);
            }
            if (!context.Activities.Any())
            {
                await SeedActivities(context, userManager, photoAccessor);
            }
            if (!context.FollowerFollowings.Any())
            {
                await SeedFollowerFollowings(context, userManager, photoAccessor);
            }

            await context.SaveChangesAsync();
            var list = new List<ActivityJSON>();
            var Id = Guid.Parse("08d98198-c818-fb1d-c57f-ed4f1c4863e4");
            var Id2 = Guid.Parse("08d98198-c818-ff94-8722-d997c295bf5e");
            var activity1 = await context.Activities.FindAsync(Id);
            var activity2 = await context.Activities.FindAsync(Id);

            var data = mapper.Map<Activity, ActivityJSON>(activity1);
            var data2 = mapper.Map<Activity, ActivityJSON>(activity2);

            list.Add(data);
            list.Add(data2);

            // var ar = data.UserActivities.ToArray();
            string jsonString = JsonSerializer.Serialize(list);
            // Console.WriteLine(data.UserActivities.ToArray()[0].AppUserId);
            Console.WriteLine("hi");

            Console.WriteLine(data.UserActivities[0].DateJoined);
            Console.WriteLine(jsonString);
        }
        public static async Task<bool> PurgeDb(DataContext context, UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            context.Photos.RemoveRange(context.Photos);
            context.UserActivity.RemoveRange(context.UserActivity);
            context.FollowerFollowings.RemoveRange(context.FollowerFollowings);
            context.Activities.RemoveRange(context.Activities);

            var saveContext = await context.SaveChangesAsync();

            var results = new List<IdentityResult>();

            foreach (var user in userManager.Users.ToList())
            {
                IdentityResult result = await userManager.DeleteAsync(user);
                results.Add(result);
            }
            return (saveContext > 0 && results.All(res => res.Succeeded));
        }
        public static async Task<bool> ReSeedData(DataContext context, UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            await SeedUsers(context, userManager, photoAccessor);
            await SeedActivities(context, userManager, photoAccessor);
            await SeedFollowerFollowings(context, userManager, photoAccessor);

            return await context.SaveChangesAsync() > 0;
        }
        public static async Task SeedUsers(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            var users = new List<AppUser>();
            foreach (var user in JsonData.users)
            {
                var photos = new List<Photo>();

                foreach (var photo in user.Photos)
                {
                    photos.Add(new Photo { Id = photo.Id, Url = photo.Url, IsMain = photo.IsMain });
                    // photos.Add(photoAccessor.GetPhotoFromUrl(photo.Url, photo.IsMain));
                }

                var res = await userManager.CreateAsync(new AppUser
                {
                    Id = user.Id,
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Email = user.Email,
                    Photos = photos
                }, "Pa$$w0rd");
                Console.WriteLine(res);
            }
        }
        public static async Task SeedFollowerFollowings(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            var FollowerFollowings = new List<FollowerFollowings>();
            foreach (var followerFollowing in JsonData.followerFollowings)
            {

                FollowerFollowings.Add(new FollowerFollowings { UserAId = followerFollowing.UserAId, UserBId = followerFollowing.UserBId });
            }
            await context.FollowerFollowings.AddRangeAsync(FollowerFollowings);
        }

        public static async Task SeedActivities(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            var activities = new List<Activity>();
            foreach (var activity in JsonData.activities)
            {
                var userActivities = new List<UserActivity>();
                foreach (var useractivity in activity.UserActivities)
                {
                    userActivities.Add(new UserActivity
                    {
                        AppUserId = useractivity.AppUserId,
                        IsHost = useractivity.IsHost,
                        DateJoined = useractivity.DateJoined,
                        ActivityId = useractivity.ActivityId
                    });
                }
                Console.WriteLine(activity.Id);
                activities.Add(new Activity
                {
                    Id = activity.Id,
                    Title = activity.Title,
                    Date = activity.Date,
                    Description = activity.Description,
                    Category = activity.Category,
                    City = activity.City,
                    Latitute = activity.Latitute,
                    Longitute = activity.Longitute,
                    Venue = activity.Venue,
                    UserActivities = userActivities
                });
            }
            await context.Activities.AddRangeAsync(activities);
        }
    }
}