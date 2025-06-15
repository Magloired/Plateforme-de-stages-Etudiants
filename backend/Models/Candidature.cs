namespace backend.Models
{
    public class Candidature
    {
        public int Id { get; set; }

        // Clé étrangère vers l'utilisateur (candidat)
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        // Clé étrangère vers l'offre de stage
        public int OffreDeStageId { get; set; }
        public OffreStage OffreDeStage { get; set; } = null!;

        // Date et heure de la candidature
        public DateTime DateSoumission { get; set; } = DateTime.UtcNow;

        // Statut de la candidature (EnAttente, Acceptee, Rejetee)
        public StatutCandidature Statut { get; set; } = StatutCandidature.EnAttente;

        // Lien vers CV ou lettre de motivation (URL ou chemin)
        public string? DocumentUrl { get; set; }
    }

}