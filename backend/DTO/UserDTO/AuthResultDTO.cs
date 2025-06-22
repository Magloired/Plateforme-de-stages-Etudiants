
using backend.DTO.UserDTO;

namespace backend.DTO.UserDTO
{
    public class AuthResultDTO
    {
        public string Token { get; set; } = string.Empty;
        public UserDTO User { get; set; } = new();
    }
}