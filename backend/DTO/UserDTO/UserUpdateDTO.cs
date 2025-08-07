using System.ComponentModel.DataAnnotations;

namespace backend.DTO.UserDTO
{
    public class UserUpdateDTO
    {
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        
        [EmailAddress]
        public string? Email { get; set; }
        
        public string? Password { get; set; }
        public string? Role { get; set; }
        public bool? IsActif { get; set; }
        
        // Spécifique à étudiant
        public string? Filiere { get; set; }
        public string? NiveauEtude { get; set; }
        public string? Telephone { get; set; }
    }
} 