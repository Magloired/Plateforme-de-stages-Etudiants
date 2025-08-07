using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTO.UserDTO;
using backend.Models;
using backend.Models.Enums;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<IEnumerable<UserReadDTO>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(MapToReadDTO);
        }

        public async Task<UserReadDTO?> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return user != null ? MapToReadDTO(user) : null;
        }

        public async Task<UserReadDTO> AddUserAsync(UserCreateDTO dto)
        {
            var user = new User
            {
                Nom = dto.Nom,
                Prenom = dto.Prenom,
                Email = dto.Email,
                PasswordHash = dto.Password, // Note: devrait être hashé
                Role = Enum.Parse<Role>(dto.Role),
                IsActif = true,
                DateInscription = DateTime.UtcNow,
                Filiere = dto.Filiere,
                NiveauEtude = dto.NiveauEtude,
                Telephone = dto.Telephone
            };

            await _userRepository.AddAsync(user);
            return MapToReadDTO(user);
        }

        public async Task UpdateUserAsync(int id, UserUpdateDTO dto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                throw new KeyNotFoundException($"Utilisateur avec id {id} non trouvé.");

            if (dto.Nom != null) user.Nom = dto.Nom;
            if (dto.Prenom != null) user.Prenom = dto.Prenom;
            if (dto.Email != null) user.Email = dto.Email;
            if (dto.Password != null) user.PasswordHash = dto.Password; // Note: devrait être hashé
            if (dto.Role != null) user.Role = Enum.Parse<Role>(dto.Role);
            if (dto.IsActif.HasValue) user.IsActif = dto.IsActif.Value;
            if (dto.Filiere != null) user.Filiere = dto.Filiere;
            if (dto.NiveauEtude != null) user.NiveauEtude = dto.NiveauEtude;
            if (dto.Telephone != null) user.Telephone = dto.Telephone;

            await _userRepository.UpdateAsync(user);
        }

        public async Task DeleteUserAsync(int id)
        {
            await _userRepository.DeleteAsync(id);
        }

        private static UserReadDTO MapToReadDTO(User user)
        {
            return new UserReadDTO
            {
                Id = user.Id,
                Nom = user.Nom,
                Prenom = user.Prenom,
                Email = user.Email,
                Role = user.Role.ToString(),
                IsActif = user.IsActif,
                DateInscription = user.DateInscription,
                Filiere = user.Filiere,
                NiveauEtude = user.NiveauEtude,
                Telephone = user.Telephone,
                // Specialite n'est pas stocké dans le modèle User
            };
        }
    }
} 