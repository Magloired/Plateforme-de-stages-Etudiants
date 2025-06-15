
namespace backend.Models
{
    public class Entreprise
    {
        public int Id { get; set; }
        public string? Nom { get; set; }
        public string? Adresse { get; set; }
        public string? EmailContact { get; set; }
        public Specialite Specialite { get; set; }
    }
}
