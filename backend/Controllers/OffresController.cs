
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using backend.DTO;
using backend.Services.Interfaces;
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
        public async Task<IActionResult> AddOffre([FromBody] OffreStageDTO offreStageDTO)
        {
            if (offreStageDTO == null)
            {
                return BadRequest("Offre data is null.");
            }

            await _offreService.AddOffreAsync(offreStageDTO);
            return CreatedAtAction(nameof(GetOffreById), new { id = offreStageDTO.Id }, offreStageDTO);
        }

        /// <summary>
        /// Updates an existing Offre entity.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOffre(int id, [FromBody] OffreStageDTO offreStageDTO)
        {
            if (offreStageDTO == null || offreStageDTO.Id != id)
            {
                return BadRequest("Offre data is invalid.");
            }

            var existingOffre = await _offreService.GetOffreByIdAsync(id);
            if (existingOffre == null)
            {
                return NotFound();
            }

            await _offreService.UpdateOffreAsync(offreStageDTO);
            return NoContent();
        }

        /// <summary>
        /// Deletes an Offre entity by its ID.
        /// </summary>
        [HttpDelete("{id}")]
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