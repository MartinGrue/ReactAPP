using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser, IdentityRole, string>
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options) { }

        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivity { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<FollowerFollowings> FollowerFollowings { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            //See Domain.Photo
            // builder.Entity<Photo>(
            //     x =>
            //         x.HasOne(a => a.AppUser).WithMany(b => b.Photos).HasForeignKey(a => a.AppUserId)
            // );

            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));

            builder.Entity<UserActivity>(
                x =>
                    x.HasOne(a => a.AppUser)
                        .WithMany(b => b.UserActivities)
                        .HasForeignKey(a => a.AppUserId)
            );

            builder.Entity<UserActivity>(
                x =>
                    x.HasOne(a => a.Activity)
                        .WithMany(b => b.UserActivities)
                        .HasForeignKey(a => a.ActivityId)
            );

            builder.Entity<FollowerFollowings>().HasKey(k => new { k.UserAId, k.UserBId });
            builder.Entity<FollowerFollowings>(
                x =>
                    x.HasOne(a => a.UserA).WithMany(b => b.Followings).HasForeignKey(k => k.UserAId)
            );

            builder.Entity<FollowerFollowings>(
                x => x.HasOne(a => a.UserB).WithMany(b => b.Followers).HasForeignKey(k => k.UserBId)
            );
        }
    }
}
