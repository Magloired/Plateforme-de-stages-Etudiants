using AutoMapper;
using backend.Models;
using backend.DTO.EntrepriseDTO;

namespace backend.Mapping 
{
    public class EntrepriseMappingProfile : Profile
    {
        public EntrepriseMappingProfile()
        {
            CreateMap<Entreprise, EntrepriseReadDTO>();
            CreateMap<EntrepriseReadDTO, Entreprise>();
            
            CreateMap<EntrepriseCreateDTO, Entreprise>();
            CreateMap<EntrepriseUpdateDTO, Entreprise>();
        }
    }

}