using System;

namespace ProMed.API.Models
{
    public class Appointment
    {
        public int AppointmentID { get; set; }

        public int PatientID { get; set; }
        public Patient? Patient { get; set; }

        public int DoctorID { get; set; }
        public Doctor? Doctor { get; set; }

        public DateTime AppointmentDate { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; } // Ex: Programat, Finalizat, Anulat
    }
}
