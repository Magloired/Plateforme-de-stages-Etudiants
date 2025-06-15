using backend.Data;
using backend.Models;
using backend.Models.Enums;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class EntrepriseRepository : IEntrepriseRepository
    {
        private readonly ApplicationDbContext _context;

        public EntrepriseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Entreprise>> GetAllEntreprisesAsync()
        {
            return await _context.Entreprises
                .Include(e => e.OffresStages) // avec les offres
                .ToListAsync();
        }

        public async Task<Entreprise?> GetEntrepriseByIdAsync(int id)
        {
            return await _context.Entreprises
                .Include(e => e.OffresStages)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task AddEntrepriseAsync(Entreprise entreprise)
        {
            _context.Entreprises.Add(entreprise);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateEntrepriseAsync(Entreprise entreprise)
        {
            _context.Entry(entreprise).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEntrepriseAsync(int id)
        {
            var entreprise = await GetEntrepriseByIdAsync(id);
            if (entreprise != null)
            {
                _context.Entreprises.Remove(entreprise);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Entreprise>> SearchEntreprisesAsync(string? nom, string? ville, Specialite? specialite)
        {
            var query = _context.Entreprises.AsQueryable();

            if (!string.IsNullOrEmpty(nom))
                query = query.Where(e => e.Nom.Contains(nom));

            if (!string.IsNullOrEmpty(ville))
                query = query.Where(e => e.Ville!.Contains(ville));

            if (specialite.HasValue)
                query = query.Where(e => e.Specialite == specialite.Value);

            return await query.ToListAsync();
        }
    }
}
