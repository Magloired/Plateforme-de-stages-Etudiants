/**
 * RegisterDTO.cs
 * This file defines the data transfer object for user registration.
 * It contains properties for the user's name, email, password, and role.
 */

namespace backend.DTO
{
    public class RegisterDTO
    {
        public required string Nom { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }
    }
}
