using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.interfaces;
using Domain;
using Microsoft.AspNetCore.Identity;
using Persistence;

namespace API
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager, IPhotoAccessor photoAccessor)
        {
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        Photos = new List<Photo>{
                            photoAccessor.GetPhotoFromUrl("https://randomuser.me/api/portraits/men/69.jpg", true),
                            photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/896/300/300.jpg",false),
                            photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/603/300/300.jpg",false),
                            photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/2/300/300.jpg",false),
                            photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/183/300/300.jpg",false),
                        }
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        Photos = new List<Photo>{
                        photoAccessor.GetPhotoFromUrl("https://randomuser.me/api/portraits/women/42.jpg", true),
                        photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/814/300/300.jpg",false),
                        photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/811/300/300.jpg",false),
                        photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/659/300/300.jpg",false),
                        photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/615/300/300.jpg",false)
                        }
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com",
                        Photos = new List<Photo>{
                        photoAccessor.GetPhotoFromUrl("https://randomuser.me/api/portraits/men/36.jpg", true),
                        photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/877/300/300.jpg",false),
                        photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/87/300/300.jpg",false),
                        photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/52/300/300.jpg",false),
                        photoAccessor.GetPhotoFromUrl("https://picsum.photos/id/848/300/300.jpg",false)
                        }
                    }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            if (!context.Activities.Any())
            {
                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Activity 2 months ago",
                        Category = "Drinks",
                        City = "London",
                        Latitute= 51.5073509,
                        Longitute= -0.12775829999998223,
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "Culture",
                        City = "Paris",
                        Latitute= 48.856614,
                        Longitute = 2.3522219000000177,
                        Venue = "The Louvre",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Activity 1 month in future",
                        Category = "Music",
                        City = "Braunschweig",
                        Latitute=52.2688736,
                        Longitute=10.526769599999966,
                        Venue = "Eintracht-Stadion",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Activity 2 months in future",
                        Category = "Food",
                        City = "Berlin",
                        Latitute= 52.52000659999999,
                        Longitute=13.404953999999975,
                        Venue = "Italian Food",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Activity 3 months in future",
                        Category = "Drinks",
                        City = "London",
                        Latitute= 51.5073509,
                        Longitute= -0.12775829999998223,
                        Venue = "Pub",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Activity 4 months in future",
                        Category = "Culture",
                        City = "Paris",
                        Latitute= 48.856614,
                        Longitute = 2.3522219000000177,
                        Venue = "Eiffel Tower",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Activity 5 months in future",
                        Category = "Drinks",
                        City = "Brunswick",
                        Latitute=52.2688736,
                        Longitute=10.526769599999966,
                        Venue = "Brunswick castle",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(5)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Activity 6 months in future",
                        Category = "Music",
                        City = "Berlin",
                        Latitute= 52.52000659999999,
                        Longitute=13.404953999999975,
                        Venue = "Brandenburg Gate",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(6)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Activity 7 months in future",
                        Category = "Travel",
                        City = "Berlin",
                        Latitute= 52.52000659999999,
                        Longitute=13.404953999999975,
                        Venue = "Berlin Television Tower",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(7)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "Drinks",
                        City = "Berlin",
                        Latitute= 52.52000659999999,
                        Longitute=13.404953999999975,
                        Venue = "Berlin Cathedral",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserActivity
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 9",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "Activity 8 months in future",
                        Category = "Drinks",
                        City = "Berlin",
                        Latitute= 52.52000659999999,
                        Longitute=13.404953999999975,
                        Venue = "Kurfürstendamm",
                        UserActivities = new List<UserActivity>
                        {
                            new UserActivity
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                            new UserActivity
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(8)
                            },
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
            }
            if (!context.FollowerFollowings.Any())
            {
                var FollowerFollowings = new List<FollowerFollowings>(){
                    new FollowerFollowings{
                        UserAId = "a",
                        UserBId ="b"
                    },
                     new FollowerFollowings{
                        UserAId = "b",
                        UserBId ="a"
                    },
                    new FollowerFollowings{
                        UserAId = "a",
                        UserBId ="c"
                    },
                    new FollowerFollowings{
                        UserAId = "c",
                        UserBId ="a"
                    },
                    new FollowerFollowings{
                        UserAId = "c",
                        UserBId ="b"
                    }
                };
                await context.FollowerFollowings.AddRangeAsync(FollowerFollowings);
            }
            await context.SaveChangesAsync();
        }
    }
}