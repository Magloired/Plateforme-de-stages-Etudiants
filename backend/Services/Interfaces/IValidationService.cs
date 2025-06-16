using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTO.ValidationDTO;

namespace backend.Services.Interfaces
{
    public interface IValidationService
    {
        Task<IEnumerable<ValidationReadDTO>> GetAllValidationsAsync();

        Task<ValidationReadDTO> GetValidationByIdAsync(int id);

        Task<ValidationReadDTO> AddValidationAsync(ValidationCreateDTO dto);

        Task UpdateValidationAsync(int id, ValidationUpdateDTO dto);

        Task DeleteValidationAsync(int id);
    }
}
