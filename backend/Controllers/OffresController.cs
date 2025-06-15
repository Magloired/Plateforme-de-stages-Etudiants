
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
            if (offreStageCreateDTO == null)
            {
                return BadRequest("Offre data is null.");
            }

            var createdOffre = await _offreService.AddOffreAsync(offreStageCreateDTO);
            return CreatedAtAction(nameof(GetOffreById), new { id = createdOffre.Id }, createdOffre);
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