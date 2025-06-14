namespace backend.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string? Nom { get; set; } // Étudiant, Enseignant, Responsable, Admin
    }
}