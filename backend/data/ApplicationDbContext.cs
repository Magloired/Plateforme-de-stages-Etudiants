using Microsoft.EntityFrameworkCore;
using backend.Models;

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
        public DbSet<Role> Roles { get; set; }
    }
}
