using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories.Interfaces
{
    /// <summary>
    /// Interface for the User repository.
    /// Defines methods for managing User entities.
    /// </summary>
    public interface IUserRepository
    {
        /// <summary>
        /// Gets a user by email.
        /// </summary>
        /// <param name="email">The email of the user.</param>
        /// <returns>The user with the specified email, or null if not found.</returns>
        Task<User?> GetByEmailAsync(string email);

        /// <summary>
        /// Gets a user by ID.
        /// </summary>
        /// <param name="id">The ID of the user.</param>
        /// <returns>The user with the specified ID, or null if not found.</returns>
        Task<User?> GetByIdAsync(int id);

        /// <summary>
        /// Gets all users.
        /// </summary>
        /// <returns>A collection of all users.</returns>
        Task<IEnumerable<User>> GetAllAsync();

        /// <summary>
        /// Adds a new user.
        /// </summary>
        /// <param name="user">The user to add.</param>
        Task AddAsync(User user);

        /// <summary>
        /// Updates an existing user.
        /// </summary>
        /// <param name="user">The user to update.</param>
        Task UpdateAsync(User user);

        /// <summary>
        /// Deletes a user by ID.
        /// </summary>
        /// <param name="id">The ID of the user to delete.</param>
        Task DeleteAsync(int id);

        /// <summary>
        /// Checks if an email already exists.
        /// </summary>
        /// <param name="email">The email to check.</param>
        /// <returns>True if the email exists, false otherwise.</returns>
        Task<bool> EmailExistsAsync(string email);
    }
}