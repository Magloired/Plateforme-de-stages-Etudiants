public class Validation
{
    public int Id { get; set; }
    public int EnseignantId { get; set; } // Clé étrangère vers `User` (Enseignant)
    public int CandidatureId { get; set; } // Clé étrangère vers `Candidature`
    public string? Decision { get; set; } // Accepté ou Refusé
    public DateTime DateValidation { get; set; }
}