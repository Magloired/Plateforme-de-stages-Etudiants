
/**
 * LoginDTO.cs
 * This file defines the LoginDTO class used for user login data transfer.
 * It contains properties for email and password.
*/
namespace backend.DTO.UserDTO
{
    public class LoginDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}