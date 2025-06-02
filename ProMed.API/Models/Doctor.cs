using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProMed.API.Models
{
    public class Doctor
    {
        public int DoctorID { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        [Required]
        public string Specialization { get; set; } = string.Empty;

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Phone { get; set; } = string.Empty;

        // Foreign key spre Hospital
        public int HospitalID { get; set; }
        public Hospital? Hospital { get; set; }

        // Relație: Un medic are mai multe programări
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<DoctorHospital> DoctorHospitals { get; set; } = new List<DoctorHospital>();

    }
}
