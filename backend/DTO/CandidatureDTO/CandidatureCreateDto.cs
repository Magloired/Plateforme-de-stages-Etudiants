namespace Backend.DTO.CandidatureDTO
{
    public class CandidatureCreateDto
    {
        public int UserId { get; set; }
        public int OffreDeStageId { get; set; }

        public string? DocumentUrl { get; set; }
    }
}
