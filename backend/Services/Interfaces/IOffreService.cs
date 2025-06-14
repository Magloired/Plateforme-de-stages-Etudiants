using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTO;

namespace backend.Services.Interfaces
{
    /// <summary>
    /// Interface for the Offre service.
    /// This interface defines the methods for managing Offre entities.
    /// </summary>
    public interface IOffreService
    {
        /// <summary>
        /// Gets all Offre entities.
        /// </summary>
        /// <returns>A collection of Offre DTOs.</returns>
        Task<IEnumerable<OffreStageDTO>> GetAllOffresAsync();

        /// <summary>
        /// Gets an Offre entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the Offre.</param>
        /// <returns>The Offre DTO.</returns>
        Task<OffreStageDTO> GetOffreByIdAsync(int id);

        /// <summary>
        /// Adds a new Offre entity.
        /// </summary>
        /// <param name="offreStageDTO">The Offre DTO to add.</param>
        Task AddOffreAsync(OffreStageDTO offreStageDTO);

        /// <summary>
        /// Updates an existing Offre entity.
        /// </summary>
        /// <param name="offreStageDTO">The Offre DTO to update.</param>
        Task UpdateOffreAsync(OffreStageDTO offreStageDTO);

        /// <summary>
        /// Deletes an Offre entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the Offre to delete.</param>
        Task DeleteOffreAsync(int id);
    }
}