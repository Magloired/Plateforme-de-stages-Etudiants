
using AutoMapper;
using backend.Models;
using backend.DTO.CandidatureDTO;

namespace backend.Mapping
{
    public class CandidatureMappingProfile : Profile
    {
        public CandidatureMappingProfile()
        {
            CreateMap<Candidature, CandidatureReadDTO>()
                .ForMember(dest => dest.NomCandidat, opt => opt.MapFrom(src => src.User.Nom))
                .ForMember(dest => dest.TitreOffre, opt => opt.MapFrom(src => src.OffreDeStage.Titre));
            
            CreateMap<CandidatureCreateDTO, Candidature>();
            CreateMap<CandidatureUpdateDTO, Candidature>();
            
            CreateMap<CandidatureReadDTO, Candidature>();
        }
    }

}