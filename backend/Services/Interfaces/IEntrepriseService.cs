using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTO.EntrepriseDTO;

namespace backend.Services.Interfaces
{
    public interface IEntrepriseService
    {
        Task<IEnumerable<EntrepriseReadDTO>> GetAllEntreprisesAsync();
        
        Task<EntrepriseReadDTO> GetEntrepriseByIdAsync(int id);

        // Création avec DTO Create
        Task<EntrepriseReadDTO> AddEntrepriseAsync(EntrepriseCreateDTO dto);

        // Mise à jour avec DTO Update et id
        Task UpdateEntrepriseAsync(int id, EntrepriseUpdateDTO dto);

        Task DeleteEntrepriseAsync(int id);
    }
}
