namespace Backend.DTO.ValidationDTO
{
    public class ValidationCreateDto
    {
        public int EnseignantId { get; set; }
        public int CandidatureId { get; set; }

        public DecisionValidation Decision { get; set; }

        public string? Commentaire { get; set; }
    }
}
