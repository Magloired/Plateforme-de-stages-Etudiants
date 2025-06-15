

using backend.Models.Enums;


/**
 * RegisterDTO.cs
 * This file defines the data transfer object for user registration.
 * It contains properties for the user's name, email, password, and role.
 */
namespace backend.DTO.UserDTO
{
    public class RegisterDTO
    {
        public string Nom { get; set; } = null!;
        public string Prenom { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public Role Role { get; set; }
    }
}
