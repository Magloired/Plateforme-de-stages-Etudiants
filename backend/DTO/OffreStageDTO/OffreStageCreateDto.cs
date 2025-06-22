namespace backend.DTO.OffreStageDTO
{
    public class OffreStageCreateDTO
    {
        public string Titre { get; set; } = null!;
        public string? Description { get; set; }
        public int DureeMois { get; set; }
        public string? Lieu { get; set; }
        public string? TypeStage { get; set; }
        public decimal? Remuneration { get; set; }
        public DateTime? DateLimiteCandidature { get; set; }

        // Clé étrangère
        public int EntrepriseId { get; set; }
    }
}
