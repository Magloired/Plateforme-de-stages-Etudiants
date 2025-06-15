using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTO.EntrepriseDTOs;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class EntrepriseService : IEntrepriseService
    {
        private readonly IEntrepriseRepository _entrepriseRepository;
        private readonly IMapper _mapper;

        public EntrepriseService(IEntrepriseRepository entrepriseRepository, IMapper mapper)
        {
            _entrepriseRepository = entrepriseRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EntrepriseReadDTO>> GetAllEntreprisesAsync()
        {
            var entreprises = await _entrepriseRepository.GetAllEntreprisesAsync();
            return _mapper.Map<IEnumerable<EntrepriseReadDTO>>(entreprises);
        }

        public async Task<EntrepriseReadDTO> GetEntrepriseByIdAsync(int id)
        {
            var entreprise = await _entrepriseRepository.GetEntrepriseByIdAsync(id);
            return _mapper.Map<EntrepriseReadDTO>(entreprise);
        }

        public async Task<EntrepriseReadDTO> AddEntrepriseAsync(EntrepriseCreateDTO dto)
        {
            var entreprise = _mapper.Map<Entreprise>(dto);
            await _entrepriseRepository.AddEntrepriseAsync(entreprise);
            return _mapper.Map<EntrepriseReadDTO>(entreprise);
        }

        public async Task UpdateEntrepriseAsync(int id, EntrepriseUpdateDTO dto)
        {
            var entrepriseExistante = await _entrepriseRepository.GetEntrepriseByIdAsync(id);
            if (entrepriseExistante == null)
                throw new KeyNotFoundException($"Entreprise avec id {id} non trouvée.");

            _mapper.Map(dto, entrepriseExistante);

            await _entrepriseRepository.UpdateEntrepriseAsync(entrepriseExistante);
        }

        public async Task DeleteEntrepriseAsync(int id)
        {
            await _entrepriseRepository.DeleteEntrepriseAsync(id);
        }
    }
}
