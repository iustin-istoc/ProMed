using System;
using System.ComponentModel.DataAnnotations;

namespace ProMed.API.Models
{
    public class Appointment
    {
        public int AppointmentID { get; set; }

        [Required]
        public int PatientID { get; set; }

        public Patient? Patient { get; set; }

        [Required]
        public int DoctorID { get; set; }

        public Doctor? Doctor { get; set; }

        [Required]
        public DateTime AppointmentDate { get; set; }

        [Required]
        public string Reason { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = "Programat"; // default status
    }
}
