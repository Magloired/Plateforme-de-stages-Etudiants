
using AutoMapper;
using backend.Models;
using backend.DTO.ValidationDTO;

namespace backend.Mapping
{
    public class ValidationMappingProfile : Profile
    {
        public ValidationMappingProfile()
        {
            CreateMap<Validation, ValidationReadDTO>()
                .ForMember(dest => dest.NomEnseignant, opt => opt.MapFrom(src => src.Enseignant.Nom))
                .ForMember(dest => dest.NomCandidat, opt => opt.MapFrom(src => src.Candidature.User.Nom));
                //.ForMember(dest => dest.Titre, opt => opt.MapFrom(src => src.Candidature.OffreDeStage.Titre));

            CreateMap<ValidationCreateDTO, Validation>();

            CreateMap<ValidationUpdateDTO, Validation>();

            CreateMap<ValidationReadDTO, Validation>();
        }
    }
}
