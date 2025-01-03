﻿using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;


namespace FD_CPTP_UNIFIED
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
               .ConfigureAppConfiguration(options =>
               {
                   options.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
               })
            .UseKestrel(c => c.AddServerHeader = false)//VAPT
                .UseStartup<Startup>();
    }
}
