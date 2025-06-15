namespace backend.DTO.CandidatureDTO
{
    public class CandidatureCreateDTO
    {
        public int UserId { get; set; }
        public int OffreDeStageId { get; set; }

        public string? DocumentUrl { get; set; }
    }
}
