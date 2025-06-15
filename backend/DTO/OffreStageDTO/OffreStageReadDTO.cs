namespace Backend.DTO.OffreStageDTO
{
    public class OffreStageReadDTO
    {
        public int Id { get; set; }
        public string Titre { get; set; } = null!;
        public string? Description { get; set; }
        public DateTime DatePublication { get; set; }
        public int DureeMois { get; set; }
        public string? Lieu { get; set; }
        public string? TypeStage { get; set; }
        public decimal? Remuneration { get; set; }
        public DateTime? DateLimiteCandidature { get; set; }
        public bool IstActive { get; set; }

        // Infos simplifiées de l'entreprise
        public int EntrepriseId { get; set; }
        public string EntrepriseNom { get; set; } = null!;
    }
}
