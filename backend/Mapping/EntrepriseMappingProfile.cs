using AutoMapper;
using backend.Models;
using backend.DTO.EntrepriseDTO

namespace backend.Mapping 
{
    public class EntrepriseMappingProfile : Profile
    {
        public EntrepriseMappingProfile()
        {
            CreateMap<Entreprise, EntrepriseDTO>();
            CreateMap<EntrepriseDTO, Entreprise>();
            
            CreateMap<EntrepriseCreateDTO, Entreprise>();
            CreateMap<EntrepriseUpdateDTO, Entreprise>();
        }
    }

}