using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTO.CandidatureDTO;
using backend.Models;

namespace backend.Services.Interfaces
{
    public interface ICandidatureService
    {
        Task<IEnumerable<CandidatureReadDTO>> GetAllCandidaturesAsync();
        
        Task<CandidatureReadDTO> GetCandidatureByIdAsync(int id);

        // Pour la création, on utilise le DTO Create
        Task<CandidatureReadDTO> AddCandidatureAsync(CandidatureCreateDTO dto);

        // Pour la mise à jour, on utilise le DTO Update, avec l'id séparé
        Task UpdateCandidatureAsync(int id, CandidatureUpdateDTO dto);

        Task DeleteCandidatureAsync(int id);
    }
}
