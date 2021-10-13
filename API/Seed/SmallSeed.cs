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
        public static SeedData database = Deserialize("Database.json");
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
            string jsonString = JsonSerializer.Serialize(jsonData);
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
        }
        public static async Task<bool> PurgeDb(DataContext context, UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            context.Photos.RemoveRange(context.Photos);
            context.Comments.RemoveRange(context.Comments);
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
            newdata = Deserialize("seedData.json");
            database = Deserialize("Database.json");

            await SeedUsers(context, userManager, photoAccessor);
            await SeedActivities(context, userManager, photoAccessor);
            await SeedFollowerFollowings(context, userManager, photoAccessor);

            var success = await context.SaveChangesAsync();

            Serialize("Database.json", userManager, mapper, context);

            return success > 0;
        }
        public static void CreateUser(AppUser user, List<AppUser> users, IPhotoAccessor photoAccessor = null)
        {
            var photos = new List<Photo>();
            foreach (var photo in user.Photos)
            {
                photos.Add(
                    photoAccessor == null
                    ? new Photo { Id = photo.Id, Url = photo.Url, IsMain = photo.IsMain }
                    : photoAccessor.GetPhotoFromUrl(photo.Url, photo.IsMain));
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
        public static async Task ForEachAsync<T>(this List<T> list, Func<T, Task> func)
        {
            foreach (var value in list)
            {
                await func(value);
            }
        }

        public static async Task SeedUsers(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            var users = new List<AppUser>();
            newdata.users.ForEach((user) =>
            {
                if (!database.users.Exists((dbUser) => dbUser.Id == user.Id))
                    CreateUser(user, users, photoAccessor);
            }
            );
            database.users.ForEach((user) => CreateUser(user, users));
            List<IdentityResult> results = new List<IdentityResult>();
            await users.ForEachAsync(async (user) => results.Add(await userManager.CreateAsync(user, "Pa$$w0rd")));
            results.ToList().TrueForAll((res) => res.Succeeded);
        }
        public static async Task SeedFollowerFollowings(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            var FollowerFollowings = new List<FollowerFollowings>();
            database.followerFollowings.ForEach((ff) =>
             FollowerFollowings.Add(new FollowerFollowings { UserAId = ff.UserAId, UserBId = ff.UserBId }));
            await context.FollowerFollowings.AddRangeAsync(FollowerFollowings);
        }
        public static void CreateActivity(Activity activity, List<Activity> activities)
        {
            activity.Id = activity.Id == Guid.Empty ? Guid.NewGuid() : activity.Id;

            var userActivities = new List<UserActivity>();
            foreach (var useractivity in activity.UserActivities)
            {
                userActivities.Add(new UserActivity
                {
                    AppUserId = useractivity.AppUserId,
                    IsHost = useractivity.IsHost,
                    DateJoined = useractivity.DateJoined,
                    ActivityId = activity.Id
                });
            }
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
        public static async Task SeedActivities(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            var activities = new List<Activity>();

            newdata.activities.ForEach((newactivity) =>
            {
                if (!database.activities.Exists((oldactivity) => oldactivity.Title == newactivity.Title))
                    CreateActivity(newactivity, activities);
            });
            database.activities.ForEach((activity) => CreateActivity(activity, activities));
            await context.Activities.AddRangeAsync(activities);
        }
    }
}