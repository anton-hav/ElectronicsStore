using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;
using System.Reflection;
using System.Text;
using ElectronicsStore.DataBase;
using ElectronicsStore.Data.Abstractions;
using ElectronicsStore.Data.Repositories;
using ElectronicsStore.Business.ServiceImplementations;
using ElectronicsStore.Core.Abstractions;
using ElectronicsStore.Data.Abstractions.Repositories;
using ElectronicsStore.Data.Repositories.Repositories;
using ElectronicsStore.DataBase.Entities;
using ElectronicsStore.WebAPI.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace ElectronicsStore.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Host.UseSerilog((ctx, lc) => lc
                .WriteTo.Console()
                .WriteTo.File(GetPathToLogFile(),
                    LogEventLevel.Information));

            // Add services to the container.

            var myCorsPolicyName = "ReactApp";
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(myCorsPolicyName, policyBuilder =>
                {
                    policyBuilder
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin();
                });
            });

            var connectionString = builder.Configuration.GetConnectionString("Default");
            builder.Services.AddDbContext<ElectronicsStoreDbContext>(
                optionBuilder => optionBuilder.UseSqlServer(connectionString));

            builder.Services.AddControllers();
            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.IncludeXmlComments(builder.Configuration["APIXmlDocumentation"]);
            });

            builder.Services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(options =>
                    {
                        // Only for develop environment.
                        options.RequireHttpsMetadata = false;
                        options.SaveToken = true;
                        options.TokenValidationParameters = new TokenValidationParameters()
                        {
                            ValidIssuer = builder.Configuration["Token:Issuer"],
                            ValidAudience = builder.Configuration["Token:Issuer"],
                            IssuerSigningKey =
                                new SymmetricSecurityKey(
                                    Encoding.UTF8.GetBytes(builder.Configuration["Token:JwtSecret"])),
                            ClockSkew = TimeSpan.Zero
                        };
                    }
                );

            // Add business services
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IRoleService, RoleService>();
            builder.Services.AddScoped<IItemService, ItemService>();
            builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
            builder.Services.AddScoped<IJwtUtil, JwtUtilSha256>();

            // Add repositories
            builder.Services.AddScoped<IRepository<User>, Repository<User>>();
            builder.Services.AddScoped<IRepository<Role>, Repository<Role>>();
            builder.Services.AddScoped<IRepository<Brand>, Repository<Brand>>();
            builder.Services.AddScoped<IRepository<Product>, Repository<Product>>();
            builder.Services.AddScoped<IRepository<Item>, Repository<Item>>();
            builder.Services.AddScoped<IRepository<RefreshToken>, Repository<RefreshToken>>();
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

            var app = builder.Build();
            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseSwagger();
            app.UseSwaggerUI();
            
            app.UseAuthentication();
            app.UseCors(myCorsPolicyName);
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }

        /// <summary>
        ///     Returns the path for log file recording.
        /// </summary>
        /// <returns>A string whose value contains a path to the log file</returns>
        private static string GetPathToLogFile()
        {
            var sb = new StringBuilder();
            sb.Append(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location));
            sb.Append(@"\logs\");
            sb.Append($"{DateTime.Now:yyyyMMddhhmmss}");
            sb.Append("data.log");
            return sb.ToString();
        }
    }
}