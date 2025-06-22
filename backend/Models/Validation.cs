
using backend.Models.Enums;

namespace backend.Models
{
    public class Validation
    {
        public int Id { get; set; }

        // Clé étrangère vers l'enseignant (User)
        public int EnseignantId { get; set; }
        public User Enseignant { get; set; } = null!;

        // Clé étrangère vers la candidature validée
        public int CandidatureId { get; set; }
        public Candidature Candidature { get; set; } = null!;

        // Décision : Accepté ou Refusé (mieux avec enum)
        public DecisionValidation Decision { get; set; }

        // Date de validation
        public DateTime DateValidation { get; set; } = DateTime.UtcNow;

        // Commentaire Dotif ou apréciation
        public string? Commentaire { get; set; }
    }
}