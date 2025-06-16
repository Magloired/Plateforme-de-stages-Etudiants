using AutoMapper;
using backend.Models;
using backend.DTO.UserDTO;

namespace backend.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            // Mapping modèle User => UserDTO (lecture)
            CreateMap<User, UserDTO>();

            // Mapping RegisterDTO => User (création)
            CreateMap<RegisterDTO, User>()
                // PasswordHash généré séparément, donc ignorer la correspondance Password, DateInscription & IsActif
                .ForMember(dest => dest.PasswordHash, opt => opt.Ignore())
                .ForMember(dest => dest.DateInscription, opt => opt.Ignore())
                .ForMember(dest => dest.IsActif, opt => opt.Ignore())
                ;

            CreateMap<LoginDTO, User>()
                .ForAllMembers(opt => opt.Ignore());
        }
    }
}
