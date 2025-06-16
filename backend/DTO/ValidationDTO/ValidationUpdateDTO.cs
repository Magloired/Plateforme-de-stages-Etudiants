using backend.Models.Enums;

namespace backend.DTO.ValidationDTO
{
    public class ValidationUpdateDTO
    {
        public DecisionValidation Decision { get; set; }
        public string? Commentaire { get; set; }
    }
}
