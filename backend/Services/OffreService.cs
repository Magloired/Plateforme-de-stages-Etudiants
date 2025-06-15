

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTO;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    /// <summary>
    /// Service for managing Offre entities.
    /// </summary>
    public class OffreService : IOffreService
    {
        private readonly IOffreRepository _offreRepository;
        //private readonly ICandidatureRepository _candidatureRepository;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="OffreService"/> class.
        /// </summary>
        /// <param name="offreRepository">The repository for Offre entities.</param>
        /// <param name="mapper">The mapper for converting between entities and DTOs.</param>
        public OffreService(IOffreRepository offreRepository, IMapper mapper)
        {
            _offreRepository = offreRepository;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets all Offre entities.
        /// </summary>
        /// <returns>A collection of Offre DTOs.</returns>
        public async Task<IEnumerable<OffreStageDTO>> GetAllOffresAsync()
        {
            var offres = await _offreRepository.GetAllOffresAsync();
            return _mapper.Map<IEnumerable<OffreStageDTO>>(offres);
        }

        /// <summary>
        /// Gets an Offre entity by its ID.
        /// </summary>
        /// <param name="id">The ID of the Offre.</param>
        public async Task<OffreStageDTO> GetOffreByIdAsync(int id)
        {
            var offre = await _offreRepository.GetOffreByIdAsync(id);
            return _mapper.Map<OffreStageDTO>(offre);
        }

        /// <summary>
        /// Adds a new Offre entity.
        /// </summary>
        /// <param name="offreStageDTO">The Offre DTO to add.</param>
        public async Task AddOffreAsync(OffreStageDTO offreStageDTO)
        {
            var offre = _mapper.Map<OffreStage>(offreStageDTO);
            await _offreRepository.AddOffreAsync(offre);
        }

        /// <summary>
        /// Updates an existing Offre entity.
        /// </summary>
        /// <param name="offreStageDTO">The Offre DTO to update.</param>
        public async Task UpdateOffreAsync(OffreStageDTO offreStageDTO)
        {
            var offre = _mapper.Map<OffreStage>(offreStageDTO);
            await _offreRepository.UpdateOffreAsync(offre);
        }

        public async Task DeleteOffreAsync(int id)
        {
            await _offreRepository.DeleteOffreAsync(id);
        }
    }
}