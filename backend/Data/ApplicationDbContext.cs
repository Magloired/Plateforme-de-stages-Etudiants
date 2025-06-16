using Microsoft.EntityFrameworkCore;
using backend.Models;
using backend.Models.Enums;

namespace backend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<OffreStage> Offres { get; set; }
        public DbSet<Candidature> Candidatures { get; set; }
        public DbSet<Validation> Validations { get; set; }
        public DbSet<Entreprise> Entreprises { get; set; }
        // Removed DbSet<Role> because Role is not a reference type (likely an enum)
    }
}
