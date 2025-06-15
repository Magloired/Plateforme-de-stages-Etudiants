using System.Threading.Tasks;
using backend.Models;
using backend.DTO;
using backend.Repositories.Interfaces;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        /// <summary>
        /// Registers a new user and returns a JWT token.
        /// </summary>
        /// <param name="registerDto">The user registration data.</param>
        /// <returns>A JWT token if registration is successful.</returns>
        Task<string> RegisterAsync(RegisterDTO registerDto);

        /// <summary>
        /// Logs in a user and returns a JWT token.
        /// </summary>
        /// <param name="dto">The login credentials.</param>
        /// <returns>A JWT token if login is successful, null otherwise.</returns>
        Task<string?> LoginAsync(LoginDTO dto);

        /// <summary>
        /// Checks if an email is already registered.
        /// </summary>
        /// <param name="email">The email to check.</param>
        /// <returns>True if the email is registered, false otherwise.</returns>
        Task<bool> IsEmailRegisteredAsync(string email);
    }
}
