using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProMed.API.Data;
using ProMed.API.Models;

namespace ProMed.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DoctorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Doctors
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            try
            {
                return await _context.Doctors
                    .Include(d => d.Hospital)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Eroare server: " + ex.Message);
            }
        }


        // GET: api/Doctors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);

            if (doctor == null)
                return NotFound();

            return doctor;
        }

        // PUT: api/Doctors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(int id, Doctor doctor)
        {
            if (id != doctor.DoctorID)
                return BadRequest();

            _context.Entry(doctor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // POST: api/Doctors
        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor(Doctor doctor)
        {
            _context.Doctors.Add(doctor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDoctor", new { id = doctor.DoctorID }, doctor);
        }

        // DELETE: api/Doctors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _context.Doctors.FindAsync(id);
            if (doctor == null)
                return NotFound("Doctorul nu a fost găsit.");

            // Ștergem asocierile dacă există
            var asocieri = await _context.DoctorHospitals
                .Where(dh => dh.DoctorID == id)
                .ToListAsync();

            if (asocieri.Any())
                _context.DoctorHospitals.RemoveRange(asocieri);

            _context.Doctors.Remove(doctor);
            await _context.SaveChangesAsync();

            return Ok("Doctorul și asocierile au fost șterse.");
        }




        private bool DoctorExists(int id)
        {
            return _context.Doctors.Any(e => e.DoctorID == id);
        }

        // POST: api/Doctors/3/assign-hospital/2
        [HttpPost("{doctorId}/assign-hospital/{hospitalId}")]
        public async Task<IActionResult> AssignHospitalToDoctor(int doctorId, int hospitalId)
        {
            var doctorExists = await _context.Doctors.AnyAsync(d => d.DoctorID == doctorId);
            var hospitalExists = await _context.Hospitals.AnyAsync(h => h.HospitalID == hospitalId);

            if (!doctorExists || !hospitalExists)
                return NotFound("Doctor sau spital inexistent.");

            var alreadyExists = await _context.DoctorHospitals.AnyAsync(dh =>
                dh.DoctorID == doctorId && dh.HospitalID == hospitalId);

            if (alreadyExists)
                return BadRequest("Această asociere există deja.");

            var association = new DoctorHospital
            {
                DoctorID = doctorId,
                HospitalID = hospitalId
            };

            _context.DoctorHospitals.Add(association);
            await _context.SaveChangesAsync();

            return Ok("Doctor asociat cu succes la spital.");
        }

        // GET: api/Doctors/3/hospitals
        [HttpGet("{doctorId}/hospitals")]
        public async Task<ActionResult<IEnumerable<Hospital>>> GetHospitalsForDoctor(int doctorId)
        {
            var hospitals = await _context.DoctorHospitals
                .Where(dh => dh.DoctorID == doctorId)
                .Include(dh => dh.Hospital)
                .Select(dh => dh.Hospital!)
                .ToListAsync();


            return hospitals;
        }
    }
}
