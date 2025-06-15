
using AutoMapper;
using backend.Models;
using backend.DTO.ValidationDTO;

namespace backend.Mapping
{
    public class ValidationMappingProfile : Profile
    {
        public ValidationMappingProfile()
        {
            CreateMap<Validation, ValidationDTO>()
                .ForMember(dest => dest.EnseignantNom, opt => opt.MapFrom(src => src.Enseignant.Nom))
                .ForMember(dest => dest.CandidatNom, opt => opt.MapFrom(src => src.Candidature.User.Nom))
                .ForMember(dest => dest.OffreTitre, opt => opt.MapFrom(src => src.Candidature.OffreDeStage.Titre));

            CreateMap<ValidationCreateDTO, Validation>();

            CreateMap<ValidationUpdateDTO, Validation>();

            CreateMap<ValidationDTO, Validation>();
        }
    }
}
