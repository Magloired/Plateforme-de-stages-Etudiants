using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) {}

    public DbSet<User> Users { get; set; }
    public DbSet<OffreDeStage> OffresDeStage { get; set; }
    public DbSet<Candidature> Candidatures { get; set; }
    public DbSet<Validation> Validations { get; set; }
    public DbSet<Entreprise> Entreprises { get; set; }
    public DbSet<Role> Roles { get; set; }
}