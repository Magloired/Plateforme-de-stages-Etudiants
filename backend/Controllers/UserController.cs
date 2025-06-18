using Microsoft.AspNetCore.Mvc;
using backend.DTO.UserDTO;
using backend.Services.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReadDTO>>> GetAll()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        // GET: api/User/id
        [HttpGet("{id}")]
        public async Task<ActionResult<UserReadDTO>> GetById(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound($"Utilisateur avec id {id} non trouvé.");

            return Ok(user);
        }

        // POST: api/User
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<UserReadDTO>> Create([FromBody] UserCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var createdUser = await _userService.AddUserAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);
        }

        // PATCH: api/User/id
        [HttpPatch("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, [FromBody] UserUpdateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                await _userService.UpdateUserAsync(id, dto);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Utilisateur avec id {id} non trouvé.");
            }

            return NoContent();
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _userService.DeleteUserAsync(id);
            return NoContent();
        }
    }
}
