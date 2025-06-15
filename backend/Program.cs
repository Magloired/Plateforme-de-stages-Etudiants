using backend.Repositories;
using backend.Data;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using backend.Services;

using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

var config = builder.Configuration;

// Ajout des services
builder.Services.AddControllers();

// Auto mapper
builder.Services.AddAutoMapper(typeof(Program));

// CORS - permet à tout frontend d’accéder à l’API (à adapter en prod)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Swagger - documentation API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Plateforme de stages",
        Version = "v1",
        Description = "Documentation de l'API de la plateforme de stages"
    });
});

// PostgreSQL avec Entity Framework Core
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(config.GetConnectionString("DefaultConnection")));

// Injection des dépendances
//Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IOffreService, OffreService>();
//Repositories
builder.Services.AddScoped<IOffreRepository, OffreRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Authentification JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = config["Jwt:Issuer"],
            ValidAudience = config["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Jwt:Key"] ?? throw new InvalidOperationException("JWT Key is not configured")))
        };
    });

builder.Services.AddAuthorization();

var app = builder.Build();

// Middleware d'erreur en développement (plus d’infos)
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Plateforme de stages v1");
        c.RoutePrefix = string.Empty; // Swagger à la racine (http://localhost:<port>/)
    });
}

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

// Active HTTPS redirection si tu le souhaites (attention certificat)
app.UseHttpsRedirection();

app.MapControllers();
app.MapGet("/", () => "Bienvenue sur la plateforme de stages !");

// Appliquer les migrations au démarrage
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

app.Run();
