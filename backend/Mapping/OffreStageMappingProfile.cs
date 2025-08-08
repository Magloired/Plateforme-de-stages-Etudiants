using AutoMapper;
using backend.Models;
using backend.DTO.OffreStageDTO;
using backend.DTO.EntrepriseDTO;

namespace backend.Mapping
{
    public class OffreStageMappingProfile : Profile
    {
        public OffreStageMappingProfile()
        {
            CreateMap<OffreStage, OffreStageReadDTO>()
                .ForMember(dest => dest.Entreprise, opt => opt.MapFrom(src => src.Entreprise))
                .ForMember(dest => dest.datePublication, opt => opt.MapFrom(src => src.DatePublication.ToString("yyyy-MM-ddTHH:mm:ssZ")))
                .ForMember(dest => dest.isActive, opt => opt.MapFrom(src => src.IsActive));

            CreateMap<OffreStageCreateDTO, OffreStage>()
                .ForMember(dest => dest.DatePublication, opt => opt.Ignore()) // Sera défini dans le service
                .ForMember(dest => dest.IsActive, opt => opt.Ignore()) // Sera défini dans le service
                .ForMember(dest => dest.Entreprise, opt => opt.Ignore()) // Relation gérée par EF
                .ForMember(dest => dest.Candidatures, opt => opt.Ignore()); // Relation gérée par EF

            CreateMap<OffreStageUpdateDTO, OffreStage>()
                .ForMember(dest => dest.DatePublication, opt => opt.Ignore()) // Ne pas modifier
                .ForMember(dest => dest.Entreprise, opt => opt.Ignore()) // Relation gérée par EF
                .ForMember(dest => dest.Candidatures, opt => opt.Ignore()); // Relation gérée par EF

            CreateMap<Entreprise, EntrepriseReadDTO>();
        }
    }
}
