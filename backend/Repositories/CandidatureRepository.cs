using backend.Data;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CandidatureRepository : ICandidatureRepository
    {
        private readonly ApplicationDbContext _context;

        public CandidatureRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Candidature>> GetAllCandidaturesAsync()
        {
            return await _context.Candidatures
                .Include(c => c.User)
                .Include(c => c.OffreDeStage)
                .ToListAsync();
        }

        public async Task<Candidature?> GetCandidatureByIdAsync(int id)
        {
            return await _context.Candidatures
                .Include(c => c.User)
                .Include(c => c.OffreDeStage)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task AddCandidatureAsync(Candidature candidature)
        {
            _context.Candidatures.Add(candidature);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateCandidatureAsync(Candidature candidature)
        {
            _context.Entry(candidature).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteCandidatureAsync(int id)
        {
            var candidature = await GetCandidatureByIdAsync(id);
            if (candidature != null)
            {
                _context.Candidatures.Remove(candidature);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Candidature>> GetByUserIdAsync(int userId)
        {
            return await _context.Candidatures
                .Include(c => c.OffreDeStage)
                .Where(c => c.UserId == userId)
                .ToListAsync();
        }

        public async Task<IEnumerable<Candidature>> GetByOffreStageIdAsync(int offreStageId)
        {
            return await _context.Candidatures
                .Include(c => c.User)
                .Where(c => c.OffreDeStageId == offreStageId)
                .ToListAsync();
        }

        public async Task<bool> ExistsAsync(int userId, int offreStageId)
        {
            return await _context.Candidatures
                .AnyAsync(c => c.UserId == userId && c.OffreDeStageId == offreStageId);
        }
    }
}
