namespace Backend.DTO.CandidatureDTO
{
    public class CandidatureDto
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public string NomCandidat { get; set; } = null!;

        public int OffreDeStageId { get; set; }
        public string TitreOffre { get; set; } = null!;

        public DateTime DateSoumission { get; set; }
        public StatutCandidature Statut { get; set; }

        public string? DocumentUrl { get; set; }
    }
}
