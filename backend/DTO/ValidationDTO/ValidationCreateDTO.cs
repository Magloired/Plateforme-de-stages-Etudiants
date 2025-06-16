using backend.Models.Enums;

namespace backend.DTO.ValidationDTO
{
    public class ValidationCreateDTO
    {
        public int EnseignantId { get; set; }
        public int CandidatureId { get; set; }

        public DecisionValidation Decision { get; set; }

        public string? Commentaire { get; set; }
    }
}
