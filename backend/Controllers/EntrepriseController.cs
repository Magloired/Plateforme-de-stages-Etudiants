using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using backend.DTO.EntrepriseDTO;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EntrepriseController : ControllerBase
    {
        private readonly IEntrepriseService _entrepriseService;

        public EntrepriseController(IEntrepriseService entrepriseService)
        {
            _entrepriseService = entrepriseService;
        }

        // GET: api/Entreprise
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntrepriseReadDTO>>> GetAll()
        {
            var entreprises = await _entrepriseService.GetAllEntreprisesAsync();
            return Ok(entreprises);
        }

        // GET: api/Entreprise/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EntrepriseReadDTO>> GetById(int id)
        {
            var entreprise = await _entrepriseService.GetEntrepriseByIdAsync(id);
            if (entreprise == null)
                return NotFound($"Entreprise avec id {id} non trouvée.");

            return Ok(entreprise);
        }

        // POST: api/Entreprise
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<EntrepriseReadDTO>> Create([FromBody] EntrepriseCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdEntreprise = await _entrepriseService.AddEntrepriseAsync(dto);

            // Retourner le nouvel objet créé avec URI
            return CreatedAtAction(nameof(GetById), new { id = createdEntreprise.Id }, createdEntreprise);
        }

        // PUT: api/Entreprise/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] EntrepriseUpdateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _entrepriseService.UpdateEntrepriseAsync(id, dto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Entreprise avec id {id} non trouvée.");
            }

            return NoContent();
        }

        // DELETE: api/Entreprise/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            // Tu peux ici vérifier si l'objet existe avant suppression si tu veux, sinon suppression directe
            await _entrepriseService.DeleteEntrepriseAsync(id);
            return NoContent();
        }
    }
}
