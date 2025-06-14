public class Entreprise
{
    public int Id { get; set; }
    public string? Nom { get; set; }
    public string? Adresse { get; set; }
    public string? EmailContact { get; set; }

    // Navigation property : une entreprise peut avoir plusieurs offres de stage
    public ICollection<OffreDeStage>? OffresDeStage { get; set; }
}
