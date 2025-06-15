
namespace backend.Models
{
    public class Candidature
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Clé étrangère vers `User`
        public int OffreDeStageId { get; set; } // Clé étrangère vers `OffreDeStage`
        public DateTime DateSoumission { get; set; }
        public string? Statut { get; set; } // En attente, Acceptée, Refusée
    }
}