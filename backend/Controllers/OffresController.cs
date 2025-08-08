
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend.DTO.OffreStageDTO;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Backend.Controllers
{
    /// <summary>
    /// Controller for managing Offre entities.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class OffresController : ControllerBase
    {
        private readonly IOffreService _offreService;

        /// <summary>
        /// Initializes a new instance of the <see cref="OffresController"/> class.
        /// </summary>
        /// <param name="offreService">The service for managing Offre entities.</param>
        public OffresController(IOffreService offreService)
        {
            _offreService = offreService;
        }

        /// <summary>
        /// Gets all Offre entities.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllOffres()
        {
            var offres = await _offreService.GetAllOffresAsync();
            return Ok(offres);
        }

        /// <summary>
        /// Gets an Offre entity by its ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOffreById(int id)
        {
            var offre = await _offreService.GetOffreByIdAsync(id);
            if (offre == null)
            {
                return NotFound();
            }
            return Ok(offre);
        }

        /// <summary>
        /// Adds a new Offre entity.
        /// </summary>
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddOffre([FromBody] OffreStageCreateDTO offreStageCreateDTO)
        {
            try
            {
                Console.WriteLine($"=== Début création offre ===");
                Console.WriteLine($"Données reçues: {System.Text.Json.JsonSerializer.Serialize(offreStageCreateDTO)}");
                
                if (offreStageCreateDTO == null)
                {
                    Console.WriteLine("Erreur: OffreStageCreateDTO est null");
                    return BadRequest("Offre data is null.");
                }

                // Validation supplémentaire
                if (string.IsNullOrWhiteSpace(offreStageCreateDTO.Titre))
                {
                    Console.WriteLine("Erreur: Titre est vide");
                    return BadRequest("Titre is required.");
                }

                if (offreStageCreateDTO.DureeMois <= 0)
                {
                    Console.WriteLine("Erreur: DureeMois invalide");
                    return BadRequest("DureeMois must be greater than 0.");
                }

                if (offreStageCreateDTO.EntrepriseId <= 0)
                {
                    Console.WriteLine("Erreur: EntrepriseId invalide");
                    return BadRequest("EntrepriseId is required.");
                }

                Console.WriteLine("Validation OK, appel du service...");
                var createdOffre = await _offreService.AddOffreAsync(offreStageCreateDTO);
                Console.WriteLine($"Offre créée avec succès, ID: {createdOffre.Id}");
                
                return CreatedAtAction(nameof(GetOffreById), new { id = createdOffre.Id }, createdOffre);
            }
            catch (Exception ex)
            {
                // Log l'erreur pour le débogage
                Console.WriteLine($"=== ERREUR CRÉATION OFFRE ===");
                Console.WriteLine($"Message: {ex.Message}");
                Console.WriteLine($"Type: {ex.GetType().Name}");
                Console.WriteLine($"StackTrace: {ex.StackTrace}");
                
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.Message}");
                    Console.WriteLine($"Inner StackTrace: {ex.InnerException.StackTrace}");
                }
                
                return StatusCode(500, new { 
                    message = "Une erreur interne s'est produite lors de la création de l'offre.",
                    details = ex.Message,
                    type = ex.GetType().Name
                });
            }
        }

        /// <summary>
        /// Updates an existing Offre entity.
        /// </summary>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateOffre(int id, [FromBody] OffreStageUpdateDTO offreStageUpdateDTO)
        {
            if (offreStageUpdateDTO == null)
            {
                return BadRequest("Offre data is invalid.");
            }

            var existingOffre = await _offreService.GetOffreByIdAsync(id);
            if (existingOffre == null)
            {
                return NotFound();
            }

            await _offreService.UpdateOffreAsync(id, offreStageUpdateDTO);
            return NoContent();
        }

        /// <summary>
        /// Deletes an Offre entity by its ID.
        /// </summary>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteOffre(int id)
        {
            var existingOffre = await _offreService.GetOffreByIdAsync(id);
            if (existingOffre == null)
            {
                return NotFound();
            }

            await _offreService.DeleteOffreAsync(id);
            return NoContent();
        }

        /// <summary>
        /// Gets the count of all Offre entities.
        /// </summary>
        [HttpGet("count")]
        public async Task<IActionResult> GetOffreCount()
        {
            var count = await _offreService.GetAllOffresAsync();
            return Ok(count.Count());
        }
    }
}