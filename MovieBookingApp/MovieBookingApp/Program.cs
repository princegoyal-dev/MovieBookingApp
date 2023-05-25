using MongoDB.Driver;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MovieBookingApp.Business;
using MovieBookingApp.Filters;
using MovieBookingApp.Helper;
using MovieBookingApp.Interfaces.IBusiness;
using MovieBookingApp.Interfaces.IRepository;
using MovieBookingApp.Models;
using MovieBookingApp.Repository;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Enter the authorizartion token here.",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});
//builder.Services.AddSwaggerGen();


ConfigureAppsettings();
DependencyInjection();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();

void ConfigureAppsettings()
{
    builder.Services.Configure<MongoDbConfig>(builder.Configuration.GetSection(nameof(MongoDbConfig)));
}

void DependencyInjection()
{
    builder.Services.AddAutoMapper(typeof(ApplicationMapper).Assembly);
    builder.Services.AddSingleton<IMongoClient>(mongoConnection => new MongoClient(builder.Configuration.GetValue<string>("MongoDbConfig:ConnectionString")));

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });



    builder.Services.AddScoped<NullCheckFilter>();

    builder.Services.AddSingleton<IIdentityBusiness, IdentityBusiness>();

    builder.Services.AddSingleton<IUserBusiness, UserBusiness>();
    builder.Services.AddSingleton<IUserRepository, UserRepository>();

    builder.Services.AddSingleton<IMovieBusiness, MovieBusiness>();
    builder.Services.AddSingleton<IMovieRepository, MovieRepository>();

    builder.Services.AddSingleton<ITicketBusiness, TicketBusiness>();
    builder.Services.AddSingleton<ITicketRepository, TicketRepository>();

}