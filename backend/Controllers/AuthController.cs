
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.DTO.UserDTO;
using backend.Models;
using backend.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using backend.Services.Interfaces;

// <summary>
// Controller for handling user authentication and registration.
// </summary>
namespace Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Registers a new user.
    /// </summary>
    /// <param name="dto">The registration data transfer object containing user details.</param>
    /// <returns>The registered user.</returns>
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDTO dto)
    {
        if (dto == null)
            return BadRequest("Invalid registration data.");

        try
        {
            var result = await _authService.RegisterAsync(dto);
            return Ok(new { message = "Registration successful", token = result });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            // Log l'erreur (à faire)
            return StatusCode(500, "Internal server error: " + ex.Message);
        }
    }


    /// <summary>
    /// Logs in a user with the provided credentials.
    /// </summary>
    /// <param name="dto">The login data transfer object containing email and password.</param>
    /// <returns>The logged-in user if credentials are valid, otherwise null.</returns>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO dto)
    {
        if (dto == null)
        {
            return BadRequest("Invalid login data.");
        }

        /*var token await _authService.LoginAsync(dto);

        if (token == null)
        {
            return Unauthorized("Invalid email or password.");
        }*/

        var user = await _authService.LoginAsync(dto);
        if (user == null)
        {
            return Unauthorized("Invalid email or password.");
        }

        return Ok(user);
        //return Ok( new { token = token, user = user });

    }
}