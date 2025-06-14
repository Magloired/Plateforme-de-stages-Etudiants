using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backend.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class OffresDeStageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OffresDeStageController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/OffresDeStage
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OffreDeStage>>> GetAll()
        {
            return await _context.OffresDeStage.Include(o => o.Entreprise).ToListAsync();
        }

        // GET: api/OffresDeStage/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<OffreDeStage>> GetById(int id)
        {
            var offre = await _context.OffresDeStage
                .Include(o => o.Entreprise)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (offre == null)
                return NotFound();

            return offre;
        }

        // POST: api/OffresDeStage
        [HttpPost]
        public async Task<ActionResult<OffreDeStage>> Create(OffreDeStage offre)
        {
            offre.DatePublication = DateTime.UtcNow;
            _context.OffresDeStage.Add(offre);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = offre.Id }, offre);
        }

        // PUT: api/OffresDeStage/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, OffreDeStage updated)
        {
            if (id != updated.Id)
                return BadRequest();

            var offre = await _context.OffresDeStage.FindAsync(id);
            if (offre == null)
                return NotFound();

            offre.Titre = updated.Titre;
            offre.Description = updated.Description;
            offre.EntrepriseId = updated.EntrepriseId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/OffresDeStage/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var offre = await _context.OffresDeStage.FindAsync(id);
            if (offre == null)
                return NotFound();

            _context.OffresDeStage.Remove(offre);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("Le contrôleur est bien reconnu !");
        }

    }
}


