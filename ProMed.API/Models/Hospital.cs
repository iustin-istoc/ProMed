using System.Numerics;
using System.Collections.Generic;

namespace ProMed.API.Models
{
    public class Hospital
    {
        public int HospitalID { get; set; }
        public string Name { get; set; }
        public string City { get; set; }
        public string Address { get; set; }

        // Relația: Un spital are mai mulți medici
        public ICollection<Doctor> Doctors { get; set; }
    }
}
