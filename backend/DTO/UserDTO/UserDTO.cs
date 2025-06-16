using System;
using backend.Models.Enums;

namespace backend.DTO.UserDTO
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public string Email { get; set; } = null!;
        public Role Role { get; set; }
        public bool IsActif { get; set; }
        public DateTime DateInscription { get; set; }

        // Spécifique à étudiant
        public string? Filiere { get; set; }
        public string? NiveauEtude { get; set; }
        public string? Telephone { get; set; }
        public Specialite Specialite { get; set; }
    }
}
