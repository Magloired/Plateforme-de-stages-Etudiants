using backend.Models;
using backend.Models.Enums;

namespace backend.Services.Interfaces
{
    /// <summary>
    /// Interface for user-related business logic.
    /// </summary>
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUsersAsync();

        Task<User?> GetUserByIdAsync(int id);

        Task<User?> GetUserByEmailAsync(string email);

        Task<IEnumerable<User>> GetUsersByRoleAsync(Role role);

        Task<bool> EmailExistsAsync(string email);

        Task AddUserAsync(User user);

        Task UpdateUserAsync(User user);
        
        Task DeleteUserAsync(int id);
    }
}
