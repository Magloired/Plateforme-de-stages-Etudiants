public class OffreDeStage
{
    public int Id { get; set; }
    public string? Titre { get; set; }
    public string? Description { get; set; }
    public DateTime DatePublication { get; set; }
    public int EntrepriseId { get; set; } // Clé étrangère
    public Entreprise? Entreprise { get; set; } // Navigation
}