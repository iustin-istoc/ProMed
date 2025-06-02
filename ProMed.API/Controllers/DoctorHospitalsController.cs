using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProMed.API.Data;
using ProMed.API.Models;

namespace ProMed.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorHospitalsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoctorHospitalsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DoctorHospitals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DoctorHospital>>> GetDoctorHospitals()
        {
            return await _context.DoctorHospitals.ToListAsync();
        }

        // GET: api/DoctorHospitals/doctor/23
        [HttpGet("doctor/{doctorId}")]
        public async Task<ActionResult<IEnumerable<Hospital>>> GetHospitalsForDoctor(int doctorId)
        {
            var hospitals = await _context.DoctorHospitals
                .Where(dh => dh.DoctorID == doctorId)
                .Include(dh => dh.Hospital)
                .Select(dh => dh.Hospital!)
                .ToListAsync();

            return hospitals;
        }

        // POST: api/DoctorHospitals
        [HttpPost]
        public async Task<IActionResult> AddDoctorHospital([FromBody] DoctorHospital dh)
        {
            _context.DoctorHospitals.Add(dh);
            await _context.SaveChangesAsync();
            return Ok("Asociere adăugată.");
        }

        [HttpDelete("doctor/{doctorId}")]
        public async Task<IActionResult> DeleteHospitalsForDoctor(int doctorId)
        {
            var asocieri = await _context.DoctorHospitals
                .Where(dh => dh.DoctorID == doctorId)
                .ToListAsync();

            if (!asocieri.Any())
                return NotFound("Nu există asocieri pentru acest doctor.");

            _context.DoctorHospitals.RemoveRange(asocieri);
            await _context.SaveChangesAsync();

            return Ok("Asocierile au fost șterse.");
        }

    }
}
