using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.DTO.ValidationDTO;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services
{
    public class ValidationService : IValidationService
    {
        private readonly IValidationRepository _validationRepository;
        private readonly IMapper _mapper;

        public ValidationService(IValidationRepository validationRepository, IMapper mapper)
        {
            _validationRepository = validationRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ValidationReadDTO>> GetAllValidationsAsync()
        {
            var validations = await _validationRepository.GetAllValidationsAsync();
            return _mapper.Map<IEnumerable<ValidationReadDTO>>(validations);
        }

        public async Task<ValidationReadDTO> GetValidationByIdAsync(int id)
        {
            var validation = await _validationRepository.GetValidationByIdAsync(id);
            return _mapper.Map<ValidationReadDTO>(validation);
        }

        public async Task<ValidationReadDTO> AddValidationAsync(ValidationCreateDTO dto)
        {
            var validation = _mapper.Map<Validation>(dto);
            await _validationRepository.AddValidationAsync(validation);
            return _mapper.Map<ValidationReadDTO>(validation);
        }

        public async Task UpdateValidationAsync(int id, ValidationUpdateDTO dto)
        {
            var existingValidation = await _validationRepository.GetValidationByIdAsync(id);
            if (existingValidation == null)
                throw new KeyNotFoundException($"Validation with id {id} not found.");

            _mapper.Map(dto, existingValidation);
            await _validationRepository.UpdateValidationAsync(existingValidation);
        }

        public async Task DeleteValidationAsync(int id)
        {
            await _validationRepository.DeleteValidationAsync(id);
        }
    }
}
