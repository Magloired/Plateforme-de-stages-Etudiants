using backend.Models;
using backend.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace backend.Data 
{
    public static class SeedData
    {
        public static async Task SeedAdminAsync(ApplicationDbContext context)
        {
            // Vérifie si un admin existe déjà
            if (!await context.Users.AnyAsync(u => u.Role == Role.Admin))
            {
                // Hash du mot de passe
                var passwordHasher = new PasswordHasher<User>();
                var admin = new User
                {
                    Nom = "Admin",
                    Prenom = "Super",
                    Email = "admin@stages.com",
                    Role = Role.Admin,
                    IsActif = true,
                    DateInscription = DateTime.UtcNow,
                };
                admin.PasswordHash = passwordHasher.HashPassword(admin, "Admin123!");

                context.Users.Add(admin);
                await context.SaveChangesAsync();
            }
        }
    }
}
