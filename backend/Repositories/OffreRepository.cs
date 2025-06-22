
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.Data;
using backend.Repositories.Interfaces;

namespace backend.Repositories
{
    /// <summary>
    /// Repository for managing Offre entities.
    /// </summary>
    public class OffreRepository : IOffreRepository
    {
        /// <summary>
        /// The database context for accessing Offre data.
        /// </summary>
        private readonly ApplicationDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="OffreRepository"/> class.
        /// </summary>
        /// <param name="context">The database context.</param>
        public OffreRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        ///  Gets all Offre entities.
        /// </summary>
        /// <returns>A collection of Offre entities.</returns>
        public async Task<IEnumerable<OffreStage>> GetAllOffresAsync()
        {
            //return await _context.Offres.ToListAsync();
            return await _context.Offres.Include(o => o.Entreprise).ToListAsync();
        }

        /// <summary>
        /// Gets an Offre entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the Offre.</param>
        public async Task<OffreStage> GetOffreByIdAsync(int id)
        {
            var offre = await _context.Offres.FindAsync(id);
            if (offre == null)
            {
                throw new KeyNotFoundException($"Offre with id {id} not found.");
            }
            return offre;
        }


        /// <summary>
        /// Adds a new Offre entity.
        /// </summary>
        /// <param name="offre">The Offre to add.</param>
        public async Task AddOffreAsync(OffreStage offreStage)
        {
            _context.Offres.Add(offreStage);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Updates an existing Offre entity.
        /// </summary>
        /// <param name="offre">The Offre to update.</param>
        public async Task UpdateOffreAsync(OffreStage offreStage)
        {
            _context.Entry(offreStage).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Deletes an Offre entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the Offre to delete.</param>
        public async Task DeleteOffreAsync(int id)
        {
            var offre = await GetOffreByIdAsync(id);
            if (offre != null)
            {
                _context.Offres.Remove(offre);
                await _context.SaveChangesAsync();
            }
        }
    }
}