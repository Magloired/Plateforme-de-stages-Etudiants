using backend.Models.Enums;

namespace backend.DTO.EntrepriseDTO
{
    public class EntrepriseReadDTO
    {
        public int Id { get; set; }

        public string Nom { get; set; } = null!;
        public string? Description { get; set; }
        public string? SiteWeb { get; set; }

        public string? Adresse { get; set; }
        public string? Ville { get; set; }
        public string? Pays { get; set; }
        public string? Telephone { get; set; }

        public string EmailContact { get; set; } = null!;

        public Specialite Specialite { get; set; }

        public DateTime DateCreation { get; set; }
    }
}
