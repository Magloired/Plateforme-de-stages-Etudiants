using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class ValidationRepository : IValidationRepository
    {
        private readonly ApplicationDbContext _context;

        public ValidationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Validation>> GetAllValidationsAsync()
        {
            // Validation reliant le user->enseignant, offre et candidature
            return await _context.Validations
                .Include(v => v.Enseignant)
                .Include(v => v.Candidature)
                .ThenInclude(c => c.OffreDeStage)
                .ToListAsync();
        }

        public async Task<Validation?> GetValidationByIdAsync(int id)
        {
            return await _context.Validations
                .Include(v => v.Enseignant)
                .Include(v => v.Candidature)
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task AddValidationAsync(Validation validation)
        {
            _context.Validations.Add(validation);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateValidationAsync(Validation validation)
        {
            _context.Entry(validation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteValidationAsync(int id)
        {
            var validation = await GetValidationByIdAsync(id);
            if (validation != null)
            {
                _context.Validations.Remove(validation);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Validation>> GetValidationsByEnseignantAsync(int enseignantId)
        {
            return await _context.Validations
                .Include(v => v.Candidature)
                .Where(v => v.EnseignantId == enseignantId)
                .ToListAsync();
        }

        public async Task<Validation?> GetValidationByCandidatureIdAsync(int candidatureId)
        {
            return await _context.Validations
                .Include(v => v.Enseignant)
                .FirstOrDefaultAsync(v => v.CandidatureId == candidatureId);
        }
    }
}
