using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTO.OffreStageDTO;

namespace backend.Services.Interfaces
{
    /// <summary>
    /// Interface for managing OffreStage business logic.
    /// </summary>
    public interface IOffreService
    {
        /// <summary>
        /// Gets all OffreStage entities.
        /// </summary>
        /// <returns>List of read-only DTOs.</returns>
        Task<IEnumerable<OffreStageReadDTO>> GetAllOffresAsync();

        /// <summary>
        /// Gets a specific OffreStage by ID.
        /// </summary>
        Task<OffreStageReadDTO> GetOffreByIdAsync(int id);

        /// <summary>
        /// Creates a new OffreStage.
        /// </summary>
        Task<OffreStageReadDTO> AddOffreAsync(OffreStageCreateDTO dto);

        /// <summary>
        /// Updates an existing OffreStage.
        /// </summary>
        Task UpdateOffreAsync(int id, OffreStageUpdateDTO dto);

        /// <summary>
        /// Deletes an OffreStage by ID.
        /// </summary>
        Task DeleteOffreAsync(int id);
    }
}
