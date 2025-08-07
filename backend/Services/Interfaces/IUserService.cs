using System.Collections.Generic;
using System.Threading.Tasks;
using backend.DTO.UserDTO;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserReadDTO>> GetAllUsersAsync();
        Task<UserReadDTO?> GetUserByIdAsync(int id);
        Task<UserReadDTO> AddUserAsync(UserCreateDTO dto);
        Task UpdateUserAsync(int id, UserUpdateDTO dto);
        Task DeleteUserAsync(int id);
    }
} 