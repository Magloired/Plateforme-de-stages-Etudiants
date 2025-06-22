using backend.Models;
using backend.Models.Enums;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Repositories.Interfaces
{
    public interface IEntrepriseRepository
    {
        Task<IEnumerable<Entreprise>> GetAllEntreprisesAsync();
        Task<Entreprise?> GetEntrepriseByIdAsync(int id);
        Task AddEntrepriseAsync(Entreprise entreprise);
        Task UpdateEntrepriseAsync(Entreprise entreprise);
        Task DeleteEntrepriseAsync(int id);

        Task<IEnumerable<Entreprise>> SearchEntreprisesAsync(string? nom, string? ville, Specialite? specialite);
    }
}
