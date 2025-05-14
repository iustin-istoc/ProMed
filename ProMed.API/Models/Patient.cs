using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProMed.API.Models
{
    public class Patient
    {
        public int PatientID { get; set; }

        [Required(ErrorMessage = "Numele complet este obligatoriu.")]
        [StringLength(100, MinimumLength = 2)]
        public string? FullName { get; set; }

        [EmailAddress(ErrorMessage = "Email invalid.")]
        public string? Email { get; set; }

        [Phone(ErrorMessage = "Număr de telefon invalid.")]
        public string? Phone { get; set; }

        [DataType(DataType.Date)]
        public DateTime? DateOfBirth { get; set; }

        [StringLength(13, MinimumLength = 13, ErrorMessage = "CNP-ul trebuie să aibă exact 13 caractere.")]
        public string? CNP { get; set; }

        public ICollection<Appointment>? Appointments { get; set; }
    }
}
