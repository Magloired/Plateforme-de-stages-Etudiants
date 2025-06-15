
using AutoMapper;
using backend.Models;
using backend.DTO.CandidatureDTO;

namespace backend.Models
{
    public class CandidatureMappingProfile : Profile
    {
        public CandidatureMappingProfile()
        {
            CreateMap<Candidature, CandidatureDTO>()
                .ForMember(dest => dest.UserNom, opt => opt.MapFrom(src => src.User.Nom))
                .ForMember(dest => dest.OffreTitre, opt => opt.MapFrom(src => src.OffreDeStage.Titre));
            
            CreateMap<CandidatureCreateDTO, Candidature>();
            CreateMap<CandidatureUpdateDTO, Candidature>();
            
            CreateMap<CandidatureDTO, Candidature>();
        }
    }

}