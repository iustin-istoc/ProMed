using System.ComponentModel.DataAnnotations; 
using System.Collections.Generic;

namespace ProMed.API.Models
{
    public class Hospital
    {
        public int HospitalID { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string City { get; set; } = string.Empty;

        [Required]
        public string Address { get; set; } = string.Empty;

        // Relație: Un spital are mai mulți medici
        public ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
        public ICollection<DoctorHospital> DoctorHospitals { get; set; } = new List<DoctorHospital>();

    }
}
