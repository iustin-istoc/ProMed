using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProMed.API.Data;
using ProMed.API.Models;

namespace ProMed.API.Controllers
{
    [Route("api/DoctorHospitals")]
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
            {
                // Nu mai întoarce NotFound - răspunde cu 200 chiar dacă nu sunt asocieri
                return Ok("Nicio asociere de șters.");
            }

            _context.DoctorHospitals.RemoveRange(asocieri);
            await _context.SaveChangesAsync();

            return Ok("Asocierile au fost șterse.");
        }





        [HttpPost("assign-doctor/{doctorID}/to-hospital/{hospitalID}")]
        public async Task<IActionResult> AssignDoctorToHospital(int doctorID, int hospitalID)
        {
            var exista = await _context.DoctorHospitals
                .AnyAsync(dh => dh.DoctorID == doctorID && dh.HospitalID == hospitalID);

            if (exista)
                return Ok("Asocierea deja exista (ignorat).");


            var asociereNoua = new DoctorHospital
            {
                DoctorID = doctorID,
                HospitalID = hospitalID
            };

            _context.DoctorHospitals.Add(asociereNoua);
            await _context.SaveChangesAsync();

            return Ok("Asociere creată.");
        }

        [HttpDelete("doctor/{doctorID}/hospital/{hospitalID}")]
        public async Task<IActionResult> DeleteDoctorHospital(int doctorID, int hospitalID)
        {
            var relatie = await _context.DoctorHospitals
                .FirstOrDefaultAsync(dh => dh.DoctorID == doctorID && dh.HospitalID == hospitalID);

            if (relatie == null)
                return NotFound("Asocierea nu a fost găsită.");

            _context.DoctorHospitals.Remove(relatie);
            await _context.SaveChangesAsync();

            return Ok("Asocierea a fost ștearsă.");
        }

    }
}
