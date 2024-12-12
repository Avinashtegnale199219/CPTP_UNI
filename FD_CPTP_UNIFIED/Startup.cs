using System;
using MF_FD_ESARATHI_APP.Filters;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.ObjectPool;
using MvcOptionsExtensions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace FD_CPTP_UNIFIED
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public static IConfiguration Configuration { get; set; }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var sp = services.BuildServiceProvider();
            var logger = sp.GetService<ILoggerFactory>();
            var objectPoolProvider = sp.GetService<ObjectPoolProvider>();
            string[] domains = Convert.ToString(Startup.Configuration["AppSettings:AllowedCorsDomain"]).Split(',');

            //Default Compression
            services.Configure<GzipCompressionProviderOptions>(options =>
            options.Level = System.IO.Compression.CompressionLevel.Optimal);
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.EnableForHttps = true;
            });
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
            });

            //VAPT Points setting start-----------------------------------------------------------------
            services.AddHsts(options =>
            {
                options.Preload = true;
                options.IncludeSubDomains = true;
                options.ExcludedHosts.Add("::1");
                options.ExcludedHosts.Add("172.0.0.1");
                options.MaxAge = TimeSpan.FromDays(60);
            });

            if (Startup.Configuration["Envoirnment"].ToString() != "Development")
            {
                services.Configure<MvcOptions>(options =>
                {
                    options.Filters.Add(new RequireHttpsAttribute());
                });
            }

            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins(domains);
                });
            });


            services.Configure<CookiePolicyOptions>(options =>
            {
                options.MinimumSameSitePolicy = SameSiteMode.Strict;
                options.HttpOnly = HttpOnlyPolicy.None;
                options.Secure = CookieSecurePolicy.Always;
            });
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(this.SessionTimeout);
            });
            services.AddDistributedMemoryCache();
            services.AddAntiforgery(options => options.HeaderName = "X-CSRF-TOKEN");

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(AuthorizationFilter));
                options.UseHtmlEncodeJsonInputFormatter(logger.CreateLogger<MvcOptions>(), objectPoolProvider);
                options.Filters.Add(new ExceptionFilter(Configuration));
            }).AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                options.SerializerSettings.SerializationBinder = new DefaultSerializationBinder();
                options.SerializerSettings.Formatting = Formatting.None;
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
                app.UseHttpsRedirection();
                app.Use(async (context, next) =>
                {
                    context.Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
                    await next();
                });
            }

            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseCors(MyAllowSpecificOrigins);//VAPT
            app.UseSession();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
            app.UseFileServer(enableDirectoryBrowsing: false);//VAPT           
        }

        private int SessionTimeout
        {
            get
            {
                string ConnectionTimeout = Convert.ToString(Configuration.GetSection("SessionTimeOut").Value);
                if (string.IsNullOrEmpty(ConnectionTimeout))
                {
                    ConnectionTimeout = "30";
                }
                return Convert.ToInt32(ConnectionTimeout);
            }
        }

    }
}
