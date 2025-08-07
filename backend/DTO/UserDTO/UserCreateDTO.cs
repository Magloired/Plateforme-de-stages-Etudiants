using System.ComponentModel.DataAnnotations;

namespace backend.DTO.UserDTO
{
    public class UserCreateDTO
    {
        [Required]
        public string Nom { get; set; } = string.Empty;
        
        [Required]
        public string Prenom { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Password { get; set; } = string.Empty;
        
        [Required]
        public string Role { get; set; } = string.Empty;
        
        // Spécifique à étudiant
        public string? Filiere { get; set; }
        public string? NiveauEtude { get; set; }
        public string? Telephone { get; set; }
    }
} 