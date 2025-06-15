namespace Backend.DTO.ValidationDTO
{
    public class ValidationDto
    {
        public int Id { get; set; }

        public int EnseignantId { get; set; }
        public string NomEnseignant { get; set; } = null!;

        public int CandidatureId { get; set; }
        public string NomCandidat { get; set; } = null!;

        public DecisionValidation Decision { get; set; }
        public DateTime DateValidation { get; set; }

        public string? Commentaire { get; set; }
    }
}
