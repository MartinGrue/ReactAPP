using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Activities;
using Application.Followers;
using Application.interfaces;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API
{
    public class JSONData
    {
        public List<UserJSON> users { get; set; }
        public List<ActivityJSON> activities { get; set; }
        public List<FollowerFollowingsJSON> followerFollowings { get; set; }
    }

    public class SeedData
    {
        public List<AppUser> users { get; set; }
        public List<Activity> activities { get; set; }
        public List<FollowerFollowings> followerFollowings { get; set; }
    }
    public static class SmallSeed
    {
        public static string workingDirectory = Environment.CurrentDirectory;
        public static string projectDirectory = Directory.GetParent(workingDirectory).FullName;
        public static SeedData newdata = Deserialize("seedData.json");
        public static SeedData database = Deserialize("test.json");
        private static void Serialize(string filename, UserManager<AppUser> userManager, IMapper mapper, DataContext context)
        {
            string datapath = Path.Combine(projectDirectory, @"data/", filename);
            var users = new List<UserJSON>();
            var activities = new List<ActivityJSON>();
            var followerFollowings = new List<FollowerFollowingsJSON>();
            foreach (var user in userManager.Users)
            {
                var fromMapper = mapper.Map<AppUser, UserJSON>(user);
                fromMapper.Photos.ForEach((photo) => { photo.AppUserId = user.Id; });

                users.Add(fromMapper);
            }
            foreach (var activity in context.Activities)
            {
                activities.Add(mapper.Map<Activity, ActivityJSON>(activity));
            }
            foreach (var followerfollowing in context.FollowerFollowings)
            {
                followerFollowings.Add(mapper.Map<FollowerFollowings, FollowerFollowingsJSON>(followerfollowing));
            }
            var jsonData = new JSONData { activities = activities, followerFollowings = followerFollowings, users = users };
            // string jsonString = JsonSerializer.Serialize(activities);
            // string jsonString2 = JsonSerializer.Serialize(followerfollowings);
            // string jsonString3 = JsonSerializer.Serialize(users);

            string jsonString = JsonSerializer.Serialize(jsonData);
            // Console.WriteLine(jsonString);
            // Console.WriteLine(jsonString2);
            // Console.WriteLine(jsonString3);

            // Console.WriteLine("hihihhih");
            // Console.WriteLine("hihihhih");

            // Console.WriteLine("hihihhih");

            // Console.WriteLine("hihihhih");

            // Console.WriteLine("hihihhih");



            File.WriteAllText(datapath, jsonString);

        }
        private static SeedData Deserialize(string filename)
        {
            string datapath = Path.Combine(projectDirectory, @"data/", filename);
            string jsonString = File.ReadAllText(datapath);
            return JsonSerializer.Deserialize<SeedData>(jsonString);
        }
        // private static SeedData JsonData = GetSeedFromJson();
        public static async Task Seed(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor, IMapper mapper)
        {
            if (!userManager.Users.Any())
            {
                var users = await SeedUsers(context, userManager, photoAccessor);
            }
            if (!context.Activities.Any())
            {
                await SeedActivities(context, userManager, photoAccessor);
            }
            if (!context.FollowerFollowings.Any())
            {
                await SeedFollowerFollowings(context, userManager, photoAccessor);
            }


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
        public static async Task<bool> ReSeedData(DataContext context, UserManager<AppUser> userManager, IPhotoAccessor photoAccessor, IMapper mapper)
        {
            var users = await SeedUsers(context, userManager, photoAccessor);
            var activities = await SeedActivities(context, userManager, photoAccessor);
            var followerFollowings = await SeedFollowerFollowings(context, userManager, photoAccessor);

            var success = await context.SaveChangesAsync();


            Serialize("test.json", userManager, mapper, context);

            // var list = new List<ActivityJSON>();
            // var Id = Guid.Parse("08d98198-c818-fb1d-c57f-ed4f1c4863e4");
            // var Id2 = Guid.Parse("08d98198-c818-ff94-8722-d997c295bf5e");
            // var activity1 = await context.Activities.FindAsync(Id);
            // var activity2 = await context.Activities.FindAsync(Id);

            // var data = mapper.Map<Activity, ActivityJSON>(activity1);
            // var data2 = mapper.Map<Activity, ActivityJSON>(activity2);

            // list.Add(data);
            // list.Add(data2);

            // // // var ar = data.UserActivities.ToArray();
            // string jsonString = JsonSerializer.Serialize(list);
            // // // Console.WriteLine(data.UserActivities.ToArray()[0].AppUserId);
            // // Console.WriteLine("hi");

            // // Console.WriteLine(data.UserActivities[0].DateJoined);
            // Console.WriteLine(jsonString);

            return success > 0;
        }
        public static async Task<List<AppUser>> SeedUsers(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {

            var users = new List<AppUser>();

            foreach (var user in newdata.users)
            {
                if (!database.users.Exists((dbUser) => dbUser.Id == user.Id))
                {
                    Console.WriteLine("new user");
                    var photos = new List<Photo>();
                    foreach (var photo in user.Photos)
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
            }
            foreach (var user in database.users)
            {
                var photos = new List<Photo>();

                foreach (var photo in user.Photos)
                {
                    photos.Add(new Photo { Id = photo.Id, Url = photo.Url, IsMain = photo.IsMain });
                }

                users.Add(new AppUser
                {
                    Id = user.Id,
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Email = user.Email,
                    Photos = photos
                });
                // Console.WriteLine(res);
            }
            foreach (var user in users)
            {
                var res = await userManager.CreateAsync(user);
            }
            return users;
        }
        public static async Task<List<FollowerFollowings>> SeedFollowerFollowings(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            // SeedData database = Deserialize("database.json");

            var FollowerFollowings = new List<FollowerFollowings>();
            foreach (var followerFollowing in database.followerFollowings)
            {

                FollowerFollowings.Add(new FollowerFollowings { UserAId = followerFollowing.UserAId, UserBId = followerFollowing.UserBId });
            }
            await context.FollowerFollowings.AddRangeAsync(FollowerFollowings);
            return FollowerFollowings;
        }

        public static async Task<List<Activity>> SeedActivities(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {

            // SeedData database = Deserialize("database.json");

            var activities = new List<Activity>();
            foreach (var activity in database.activities)
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
                // Console.WriteLine(activity.Id);
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
            return activities;
        }
    }
}