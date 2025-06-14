using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using backend.DTO.UserDTO;
using backend.Models.Enums;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepo;
        private readonly IConfiguration _config;

        public AuthService(IUserRepository userRepo, IConfiguration config)
        {
            _userRepo = userRepo;
            _config = config;
        }

        /// <summary>
        /// Registers a new user and returns a JWT token.
        /// </summary>
        public async Task<string> RegisterAsync(RegisterDTO registerDto) 
        {
            // Valider les champs (à adapter si besoin)
            ValidateRegisterDto(registerDto);

            // Vérifier si l'email existe déjà
            var emailExists = await _userRepo.EmailExistsAsync(registerDto.Email);
            if (emailExists)
                throw new ArgumentException("Email already exists");

            // Créer l'utilisateur avec Nom, Prenom, Email, Hash Password et Role
            var user = new User
            {
                Nom = registerDto.Nom,
                Prenom = registerDto.Prenom,
                Email = registerDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password),
                Role = registerDto.Role
            };

            // Ajouter l'utilisateur (avec SaveChangesAsync dans AddAsync ou ici)
            await _userRepo.AddAsync(user);

            // Générer les claims du token
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, $"{user.Prenom} {user.Nom}"), // Utiliser prénom + nom
                new Claim(ClaimTypes.Role, user.Role.ToString()) // Role converti en string
            };

            // Générer la clé et le token JWT
            var jwtKey = _config["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
                throw new InvalidOperationException("JWT key is not configured.");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>
        /// Authenticates a user and returns a JWT token if credentials are valid.
        /// </summary>
        public async Task<string?> LoginAsync(LoginDTO dto)
        {
            var user = await _userRepo.GetByEmailAsync(dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Nom ?? string.Empty),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };

            var jwtKey = _config["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
                throw new InvalidOperationException("JWT key is not configured.");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        /// <summary>
        /// Validates the registration input.
        /// </summary>
        private void ValidateRegisterDto(RegisterDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Nom) || dto.Nom.Length > 50)
                throw new ArgumentException("Name must be between 1 and 50 characters");

            if (string.IsNullOrWhiteSpace(dto.Email) || dto.Email.Length > 100 || !IsValidEmail(dto.Email))
                throw new ArgumentException("Invalid email format or length");

            // Vérifie que le rôle est une valeur définie dans l'enum Role
            if (!Enum.IsDefined(typeof(Role), dto.Role))
                throw new ArgumentException("Invalid role value");

            ValidatePassword(dto.Password);
        }

        private bool IsValidEmail(string email)
        {
            return Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$");
        }

        private void ValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new ArgumentException("Password is required");

            if (password.Length < 6 || password.Length > 30)
                throw new ArgumentException("Password must be between 6 and 30 characters");

            if (password.Any(char.IsWhiteSpace))
                throw new ArgumentException("Password cannot contain whitespace");

            if (password.Any(char.IsControl))
                throw new ArgumentException("Password cannot contain control characters");

            var allowedSpecialChars = "!@#$%^&*()_+-=.:,;?";
            if (password.Any(c => !char.IsLetterOrDigit(c) && !allowedSpecialChars.Contains(c)))
                throw new ArgumentException("Password contains invalid characters");

            if (!password.Any(char.IsUpper) || !password.Any(char.IsLower))
                throw new ArgumentException("Password must contain both uppercase and lowercase letters");

            if (!password.Any(char.IsDigit))
                throw new ArgumentException("Password must contain at least one digit");
        }


        public Task<bool> IsEmailRegisteredAsync(string email)
        {
            throw new NotImplementedException();
        }
    }
}
