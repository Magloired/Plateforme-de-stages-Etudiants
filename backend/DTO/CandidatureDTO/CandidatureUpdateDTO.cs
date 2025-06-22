using backend.Models.Enums;

namespace backend.DTO.CandidatureDTO
{
    public class CandidatureUpdateDTO
    {
        public StatutCandidature Statut { get; set; }

        public string? DocumentUrl { get; set; }
    }
}
