

using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTO.OffreStageDTO;
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
        private readonly IMapper _mapper;

        public OffreService(IOffreRepository offreRepository, IMapper mapper)
        {
            _offreRepository = offreRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<OffreStageReadDTO>> GetAllOffresAsync()
        {
            var offres = await _offreRepository.GetAllOffresAsync();
            return _mapper.Map<IEnumerable<OffreStageReadDTO>>(offres);
        }

        public async Task<OffreStageReadDTO> GetOffreByIdAsync(int id)
        {
            var offre = await _offreRepository.GetOffreByIdAsync(id);
            return _mapper.Map<OffreStageReadDTO>(offre);
        }

        public async Task<OffreStageReadDTO> AddOffreAsync(OffreStageCreateDTO dto)
        {
            var offre = _mapper.Map<OffreStage>(dto);
            await _offreRepository.AddOffreAsync(offre);
            // Ici, offre.Id est rempli après ajout en base (selon implémentation)
            return _mapper.Map<OffreStageReadDTO>(offre);
        }

        public async Task UpdateOffreAsync(int id, OffreStageUpdateDTO dto)
        {
            var offreExistante = await _offreRepository.GetOffreByIdAsync(id);
            if (offreExistante == null) throw new KeyNotFoundException("Offre non trouvée");

            // Mapper les propriétés modifiables du DTO vers l'entité existante
            _mapper.Map(dto, offreExistante);

            await _offreRepository.UpdateOffreAsync(offreExistante);
        }

        public async Task DeleteOffreAsync(int id)
        {
            await _offreRepository.DeleteOffreAsync(id);
        }
    }
}