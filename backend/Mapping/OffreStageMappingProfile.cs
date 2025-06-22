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
                .ForMember(dest => dest.Entreprise, opt => opt.MapFrom(src => src.Entreprise));

            CreateMap<OffreStageCreateDTO, OffreStage>();

            CreateMap<OffreStageUpdateDTO, OffreStage>();

            CreateMap<OffreStageReadDTO, OffreStage>();

            CreateMap<Entreprise, EntrepriseReadDTO>();
        }
    }
}
