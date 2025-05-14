using ProMed.API.Models;

namespace ProMed.API.Data
{
    public static class DataSeeder
    {
        public static void SeedData(ApplicationDbContext context)
        {
            if (!context.Hospitals.Any())
            {
                var hospitals = Enumerable.Range(1, 10).Select(i => new Hospital
                {
                    Name = $"Spitalul {i}",
                    Address = $"Strada Exemplu {i}",
                    City = $"Oraș {i}"
                }).ToList();

                context.Hospitals.AddRange(hospitals);
                context.SaveChanges();
            }

            if (!context.Doctors.Any())
            {
                var hospitals = context.Hospitals.ToList();

                var doctors = Enumerable.Range(1, 10).Select(i => new Doctor
                {
                    FullName = $"Doctor {i}",
                    Specialization = $"Specializare {i}",
                    Email = $"doctor{i}@example.com",
                    Phone = $"0723123{i:D3}",
                    HospitalID = hospitals[i % hospitals.Count].HospitalID
                }).ToList();

                context.Doctors.AddRange(doctors);
                context.SaveChanges();
            }

            if (!context.Patients.Any())
            {
                var patients = Enumerable.Range(1, 10).Select(i => new Patient
                {
                    FullName = $"Pacient {i}",
                    Email = $"pacient{i}@gmail.com",
                    Phone = $"0712345{i:D3}",
                    DateOfBirth = DateTime.Now.AddYears(-20 - i),
                    CNP = $"12345678901{i:D2}"
                }).ToList();

                context.Patients.AddRange(patients);
                context.SaveChanges();
            }

            if (!context.Appointments.Any())
            {
                var doctors = context.Doctors.ToList();
                var patients = context.Patients.ToList();

                var appointments = Enumerable.Range(1, 10).Select(i => new Appointment
                {
                    AppointmentDate = DateTime.Now.AddDays(i),
                    Reason = $"Consultație generală {i}",
                    Status = (i % 3 == 0) ? "Finalizată" : "Programată",
                    DoctorID = doctors[i % doctors.Count].DoctorID,
                    PatientID = patients[i % patients.Count].PatientID
                }).ToList();

                context.Appointments.AddRange(appointments);
                context.SaveChanges();
            }
        }
    }
}
