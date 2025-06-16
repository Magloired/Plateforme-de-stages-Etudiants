using AutoMapper;
using backend.Models;
using backend.DTO.OffreStageDTO;

namespace backend.Mapping
{
    public class OffreStageMappingProfile : Profile
    {
        public OffreStageMappingProfile()
        {
            CreateMap<OffreStage, OffreStageReadDTO>()
                .ForMember(dest => dest.EntrepriseNom, opt => opt.MapFrom(src => src.Entreprise.Nom));

            CreateMap<OffreStageCreateDTO, OffreStage>();

            CreateMap<OffreStageUpdateDTO, OffreStage>();

            CreateMap<OffreStageReadDTO, OffreStage>();
        }
    }
}
