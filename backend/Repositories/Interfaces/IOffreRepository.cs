using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    /// <summary>
    /// Interface for the Offre repository.
    /// This interface defines the methods for managing Offre entities.
    /// </summary>
    public interface IOffreRepository
    {
        /// <summary>
        /// Gets all Offre entities.
        /// </summary>
        /// <returns>A collection of Offre entities.</returns>
        Task<IEnumerable<OffreStage>> GetAllOffresAsync();

        /// <summary>
        /// Gets an Offre entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the Offre.</param>
        /// <returns>The Offre entity.</returns>
        Task<OffreStage> GetOffreByIdAsync(int id);

        /// <summary>
        /// Adds a new Offre entity.
        /// </summary>
        /// <param name="offre">The Offre to add.</param>
        Task AddOffreAsync(OffreStage offreStage);

        /// <summary>
        /// Updates an existing Offre entity.
        /// </summary>
        /// <param name="offre">The Offre to update.</param>
        Task UpdateOffreAsync(OffreStage offreStage);

        /// <summary>
        /// Deletes an Offre entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the Offre to delete.</param>
        Task DeleteOffreAsync(int id);
    }
}