using backend.Models.Enums;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }

        // Informations de base
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }

        // Rôle (Étudiant, Enseignant, Admin, Responsable)
        public Role Role { get; set; }

        // Date d’inscription
        public DateTime DateInscription { get; set; } = DateTime.UtcNow;

        // Statut actif/inactif (utile pour désactiver un compte sans le supprimer)
        public bool IsActif { get; set; } = true;

        // --- Spécifique à Étudiant ---
        public string? Filiere { get; set; } //CCA, IRT
        public string? NiveauEtude { get; set; } // L2, L3, M1, M2
        public string? Telephone { get; set; }

        // --- Navigation ---
        public ICollection<Candidature> Candidatures { get; set; } = new List<Candidature>();
    }
}
