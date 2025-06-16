using backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories.Interfaces
{
    public interface IValidationRepository
    {
        Task<IEnumerable<Validation>> GetAllValidationsAsync();
        Task<Validation?> GetValidationByIdAsync(int id);
        Task AddValidationAsync(Validation validation);
        Task UpdateValidationAsync(Validation validation);
        Task DeleteValidationAsync(int id);

        // récupérer toutes les validations faites par un enseignant
        Task<IEnumerable<Validation>> GetValidationsByEnseignantAsync(int enseignantId);

        // récupérer la validation d'une candidature
        Task<Validation?> GetValidationByCandidatureIdAsync(int candidatureId);
    }
}
