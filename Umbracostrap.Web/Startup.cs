using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Extensions;
using WebMarkupMin.AspNetCore5;
//using WebMarkupMin.AspNetCore5;

namespace Umbracostrap.Web
{
	public class Startup
	{
		private readonly IWebHostEnvironment _env;
		private readonly IConfiguration _config;

		/// <summary>
		/// Initializes a new instance of the <see cref="Startup" /> class.
		/// </summary>
		/// <param name="webHostEnvironment">The web hosting environment.</param>
		/// <param name="config">The configuration.</param>
		/// <remarks>
		/// Only a few services are possible to be injected here https://github.com/dotnet/aspnetcore/issues/9337
		/// </remarks>
		public Startup(IWebHostEnvironment webHostEnvironment, IConfiguration config)
		{
			_env = webHostEnvironment ?? throw new ArgumentNullException(nameof(webHostEnvironment));
			_config = config ?? throw new ArgumentNullException(nameof(config));
		}

		/// <summary>
		/// Configures the services.
		/// </summary>
		/// <param name="services">The services.</param>
		/// <remarks>
		/// This method gets called by the runtime. Use this method to add services to the container.
		/// For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
		/// </remarks>
		public void ConfigureServices(IServiceCollection services)
		{
#pragma warning disable IDE0022 // Use expression body for methods
			services
				.AddWebMarkupMin(options => {
					options.AllowMinificationInDevelopmentEnvironment = true;
					options.AllowCompressionInDevelopmentEnvironment = true;
				})
				.AddHtmlMinification()
				.AddXmlMinification()
				.AddHttpCompression();

			services.AddUmbraco(_env, _config)
				.AddBackOffice()
				.AddWebsite()
				.AddComposers()
				.Build();
#pragma warning restore IDE0022 // Use expression body for methods

		}

		/// <summary>
		/// Configures the application.
		/// </summary>
		/// <param name="app">The application builder.</param>
		/// <param name="env">The web hosting environment.</param>
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseWebMarkupMin();

			app.UseStaticFiles(new StaticFileOptions
			{
				FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "backofficeViews")),
				RequestPath = "/backofficeViews"
			});

			app.UseUmbraco()
				.WithMiddleware(u =>
				{
					u.UseBackOffice();
					u.UseWebsite();
				})
				.WithEndpoints(u =>
				{
					u.UseInstallerEndpoints();
					u.UseBackOfficeEndpoints();
					u.UseWebsiteEndpoints();
				});

			// WebMarkupMin
			//app.UseWebMarkupMin();
		}

	}
}
