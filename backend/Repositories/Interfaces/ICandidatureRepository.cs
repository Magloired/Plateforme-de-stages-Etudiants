using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories.Interfaces
{
    public interface ICandidatureRepository
    {
        Task<IEnumerable<Candidature>> GetAllCandidaturesAsync();
        Task<Candidature?> GetCandidatureByIdAsync(int id);
        Task AddCandidatureAsync(Candidature candidature);
        Task UpdateCandidatureAsync(Candidature candidature);
        Task DeleteCandidatureAsync(int id);

        // Rechercher toutes les candidatures d'un utilisateur
        Task<IEnumerable<Candidature>> GetByUserIdAsync(int userId);

        // Rechercher toutes les candidatures pour une offre de stage
        Task<IEnumerable<Candidature>> GetByOffreStageIdAsync(int offreStageId);

        // Vérifier si un utilisateur a déjà candidaté à une offre donnée
        Task<bool> ExistsAsync(int userId, int offreStageId);
    }
}
