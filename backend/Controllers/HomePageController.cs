using backend.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using backend.DTO.OffreStageDTO;
using System;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/home/offres")]
    public class HomePageController : ControllerBase
    {
        private readonly IOffreService _offreService;

        public HomePageController(IOffreService offreService)
        {
            _offreService = offreService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OffreStageReadDTO>>> GetOffresActives()
        {
            var toutesLesOffres = await _offreService.GetAllOffresAsync();

            var offresFiltrees = toutesLesOffres
                .Where(o => o.IsActive
                            && (!o.DateLimiteCandidature.HasValue || o.DateLimiteCandidature.Value >= DateTime.UtcNow))
                //.OrderByDescending(o => o.DatePublication)
                .OrderBy(o => o.DatePublication)
                .ToList();

            return Ok(offresFiltrees);
        }
    }
}
