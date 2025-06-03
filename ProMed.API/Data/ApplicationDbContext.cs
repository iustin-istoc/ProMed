using Microsoft.EntityFrameworkCore;
using ProMed.API.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace ProMed.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<DoctorHospital> DoctorHospitals { get; set; }
        public DbSet<User> Utilizatori { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<DoctorHospital>()
                .HasKey(dh => new { dh.DoctorID, dh.HospitalID });

            modelBuilder.Entity<DoctorHospital>()
                .HasOne(dh => dh.Doctor)
                .WithMany(d => d.DoctorHospitals)
                .HasForeignKey(dh => dh.DoctorID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DoctorHospital>()
                .HasOne(dh => dh.Hospital)
                .WithMany(h => h.DoctorHospitals)
                .HasForeignKey(dh => dh.HospitalID)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<Appointment>()
                .Property(a => a.Status)
                .HasColumnName("Status");
    

            //constraints
        }

    }
}
