using System.Collections.Generic;

namespace ProMed.API.Models
{
    public class Doctor
    {
        public int DoctorID { get; set; }
        public string FullName { get; set; }
        public string Specialization { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        // Foreign key spre Hospital
        public int HospitalID { get; set; }
        public Hospital? Hospital { get; set; }


        // Relație: Un medic are mai multe programări
        public ICollection<Appointment> Appointments { get; set; }
    }
}
