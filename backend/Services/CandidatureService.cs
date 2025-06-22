using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTO.CandidatureDTO;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class CandidatureService : ICandidatureService
    {
        private readonly ICandidatureRepository _candidatureRepository;
        private readonly IMapper _mapper;

        public CandidatureService(ICandidatureRepository candidatureRepository, IMapper mapper)
        {
            _candidatureRepository = candidatureRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CandidatureReadDTO>> GetAllCandidaturesAsync()
        {
            var candidatures = await _candidatureRepository.GetAllCandidaturesAsync();
            return _mapper.Map<IEnumerable<CandidatureReadDTO>>(candidatures);
        }

        public async Task<CandidatureReadDTO> GetCandidatureByIdAsync(int id)
        {
            var candidature = await _candidatureRepository.GetCandidatureByIdAsync(id);
            return _mapper.Map<CandidatureReadDTO>(candidature);
        }

        public async Task<CandidatureReadDTO> AddCandidatureAsync(CandidatureCreateDTO dto)
        {
            var candidature = _mapper.Map<Candidature>(dto);
            await _candidatureRepository.AddCandidatureAsync(candidature);
            return _mapper.Map<CandidatureReadDTO>(candidature);
        }

        public async Task UpdateCandidatureAsync(int id, CandidatureUpdateDTO dto)
        {
            var candidatureExistante = await _candidatureRepository.GetCandidatureByIdAsync(id);
            if (candidatureExistante == null)
                throw new KeyNotFoundException($"Candidature avec id {id} non trouvée.");

            // Mappage des champs modifiables
            _mapper.Map(dto, candidatureExistante);

            await _candidatureRepository.UpdateCandidatureAsync(candidatureExistante);
        }

        public async Task DeleteCandidatureAsync(int id)
        {
            await _candidatureRepository.DeleteCandidatureAsync(id);
        }
    }
}