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
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;

// ------------------------------------
// CONFIGURATION DES SERVICES
// ------------------------------------

// Contrôleurs + sérialisation enum en string
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()); // Permet d’utiliser des chaînes pour les enums
    });

// AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

// CORS - à sécuriser en production
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()    // En production : spécifie ton domaine
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Swagger (documentation API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Plateforme de stages",
        Version = "v1",
        Description = "Documentation de l'API de la plateforme de stages"
    });

    // Swagger + JWT support (optionnel mais pratique)
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Entrez le token JWT",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Base de données PostgreSQL via EF Core
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(config.GetConnectionString("DefaultConnection")));

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
                Encoding.UTF8.GetBytes(config["Jwt:Key"]
                    ?? throw new InvalidOperationException("JWT Key not configured")))
        };
    });

builder.Services.AddAuthorization();

// Injection des services métiers
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IOffreService, OffreService>();
builder.Services.AddScoped<IEntrepriseService, EntrepriseService>();
builder.Services.AddScoped<ICandidatureService, CandidatureService>();
builder.Services.AddScoped<IValidationService, ValidationService>();

// Injection des repositories
builder.Services.AddScoped<IOffreRepository, OffreRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IEntrepriseRepository, EntrepriseRepository>();
builder.Services.AddScoped<ICandidatureRepository, CandidatureRepository>();
builder.Services.AddScoped<IValidationRepository, ValidationRepository>();

// ------------------------------------
// CONSTRUCTION DE L'APPLICATION
// ------------------------------------

var app = builder.Build();

// Middleware de développement
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    // Swagger à la racine
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Plateforme de stages v1");
        c.RoutePrefix = string.Empty;
    });
}
else
{
    // En production : redirige vers HTTPS
    app.UseHttpsRedirection();
}

// Active CORS
app.UseCors();

// Authentification & autorisation
app.UseAuthentication();
app.UseAuthorization();

// Mappe les routes des contrôleurs
app.MapControllers();

// Route simple d’accueil
app.MapGet("/", () => "Bienvenue sur la plateforme de stages !");

// Applique les migrations automatiques (optionnel mais pratique en dev)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate(); // Applique automatiquement les migrations en attente
}

// Lancement de l'application
app.Run();
