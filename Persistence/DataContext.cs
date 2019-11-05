
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivity { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Value>().ToTable("Values")
            .HasData(
                new Value() { Id = 1, Name = "Value01" },
                new Value() { Id = 2, Name = "Value02" },
                new Value() { Id = 3, Name = "Value03" }
            );
            builder.Entity<UserActivity>(x => x.HasKey(ua => new { ua.AppUserId, ua.ActivityId }));

            builder.Entity<UserActivity>(x => x.HasOne(a => a.AppUser)
            .WithMany(b => b.UserActivities)
            .HasForeignKey(a => a.AppUserId));

            builder.Entity<UserActivity>(x => x.HasOne(a => a.Activity)
            .WithMany(b => b.UserActivities)
            .HasForeignKey(a => a.ActivityId));
        }
    }
}
