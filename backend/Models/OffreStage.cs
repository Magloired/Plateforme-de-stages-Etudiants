namespace backend.Models
{
    public class OffreStage
    {
        public int Id { get; set; }

        // Informations basiques
        public string Titre { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime DatePublication { get; set; }

        // Durée du stage (ex: 3 mois, 6 mois)
        public int DureeMois { get; set; }

        // Lieu du stage
        public string? Lieu { get; set; }

        // Type de stage (ex: Alternance, Stage classique, PFE)
        public string? TypeStage { get; set; }

        // Rémunération
        public decimal? Remuneration { get; set; }

        // Date limite de candidature
        public DateTime? DateLimiteCandidature { get; set; }

        // Statut de l’offre (ex: ouverte, fermée, archivée)
        public bool IsActive { get; set; } = true;

        // Relation avec l’entreprise
        public int EntrepriseId { get; set; }
        public Entreprise Entreprise { get; set; } = null!;

        // Liste des candidatures associées (navigation inverse)
        public ICollection<Candidature> Candidatures { get; set; } = new List<Candidature>();
    }
}
