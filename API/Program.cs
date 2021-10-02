using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using ExtensionMethods;
namespace API
{
    public class Program
    {
        public static IHostBuilder CreateHostBuilder(string[] args) =>
       Host.CreateDefaultBuilder(args).ConfigureWebHostDefaults(webbuilder =>
       {
           webbuilder.UseStartup<Startup>()
           .UseUrls("http://*:5000");
       });

        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            host.SeedDatabase().Run();
        }
    }
}
