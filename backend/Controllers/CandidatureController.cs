using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTO.CandidatureDTO;
using backend.Services.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CandidatureController : ControllerBase
    {
        private readonly ICandidatureService _candidatureService;

        public CandidatureController(ICandidatureService candidatureService)
        {
            _candidatureService = candidatureService;
        }

        // GET: api/Candidature
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CandidatureReadDTO>>> GetAll()
        {
            var candidatures = await _candidatureService.GetAllCandidaturesAsync();
            return Ok(candidatures);
        }

        // GET: api/Candidature/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CandidatureReadDTO>> GetById(int id)
        {
            var candidature = await _candidatureService.GetCandidatureByIdAsync(id);
            if (candidature == null)
                return NotFound();

            return Ok(candidature);
        }

        // POST: api/Candidature
        [HttpPost]
        [Authorize(Roles = "Etudiant")]
        public async Task<ActionResult<CandidatureReadDTO>> Create([FromBody] CandidatureCreateDTO dto)
        {
            var created = await _candidatureService.AddCandidatureAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT: api/Candidature/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Etudiant")]
        public async Task<IActionResult> Update(int id, [FromBody] CandidatureUpdateDTO dto)
        {
            try
            {
                await _candidatureService.UpdateCandidatureAsync(id, dto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            return NoContent();
        }

        // DELETE: api/Candidature/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Etudiant")]
        public async Task<IActionResult> Delete(int id)
        {
            await _candidatureService.DeleteCandidatureAsync(id);
            return NoContent();
        }
    }
}
