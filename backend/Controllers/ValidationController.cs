using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTO.ValidationDTOs;
using backend.Services.Interfaces;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ValidationController : ControllerBase
    {
        private readonly IValidationService _validationService;

        public ValidationController(IValidationService validationService)
        {
            _validationService = validationService;
        }

        // GET: api/Validation
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ValidationReadDTO>>> GetAll()
        {
            var validations = await _validationService.GetAllValidationsAsync();
            return Ok(validations);
        }

        // GET: api/Validation/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ValidationReadDTO>> GetById(int id)
        {
            var validation = await _validationService.GetValidationByIdAsync(id);
            if (validation == null)
                return NotFound();
            return Ok(validation);
        }

        // POST: api/Validation
        [HttpPost]
        [Authorize(Roles = "Enseignant,Responsable,Admin")]
        public async Task<ActionResult<ValidationReadDTO>> Create([FromBody] ValidationCreateDTO dto)
        {
            var createdValidation = await _validationService.AddValidationAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdValidation.Id }, createdValidation);
        }

        // PUT: api/Validation/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Enseignant,Responsable,Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] ValidationUpdateDTO dto)
        {
            try
            {
                await _validationService.UpdateValidationAsync(id, dto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
            return NoContent();
        }

        // DELETE: api/Validation/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Enseignant,Responsable,Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _validationService.DeleteValidationAsync(id);
            return NoContent();
        }
    }
}
