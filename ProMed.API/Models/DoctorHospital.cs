using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace ProMed.API.Models
{
    public class DoctorHospital
    {
        public int DoctorID { get; set; }
        public Doctor? Doctor { get; set; }

        public int HospitalID { get; set; }
        public Hospital? Hospital { get; set; }
    }
}
