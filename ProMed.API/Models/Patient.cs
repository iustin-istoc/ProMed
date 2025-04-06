using System;
using System.Collections.Generic;

namespace ProMed.API.Models
{
    public class Patient
    {
        public int PatientID { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string CNP { get; set; }

        // Relație: Un pacient are mai multe programări
        public ICollection<Appointment> Appointments { get; set; }
    }
}
