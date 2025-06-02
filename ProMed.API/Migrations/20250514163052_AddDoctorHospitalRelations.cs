using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProMed.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDoctorHospitalRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoctorHospital_Doctors_DoctorID",
                table: "DoctorHospital");

            migrationBuilder.DropForeignKey(
                name: "FK_DoctorHospital_Hospitals_HospitalID",
                table: "DoctorHospital");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DoctorHospital",
                table: "DoctorHospital");

            migrationBuilder.RenameTable(
                name: "DoctorHospital",
                newName: "DoctorHospitals");

            migrationBuilder.RenameIndex(
                name: "IX_DoctorHospital_HospitalID",
                table: "DoctorHospitals",
                newName: "IX_DoctorHospitals_HospitalID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DoctorHospitals",
                table: "DoctorHospitals",
                columns: new[] { "DoctorID", "HospitalID" });

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorHospitals_Doctors_DoctorID",
                table: "DoctorHospitals",
                column: "DoctorID",
                principalTable: "Doctors",
                principalColumn: "DoctorID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorHospitals_Hospitals_HospitalID",
                table: "DoctorHospitals",
                column: "HospitalID",
                principalTable: "Hospitals",
                principalColumn: "HospitalID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoctorHospitals_Doctors_DoctorID",
                table: "DoctorHospitals");

            migrationBuilder.DropForeignKey(
                name: "FK_DoctorHospitals_Hospitals_HospitalID",
                table: "DoctorHospitals");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DoctorHospitals",
                table: "DoctorHospitals");

            migrationBuilder.RenameTable(
                name: "DoctorHospitals",
                newName: "DoctorHospital");

            migrationBuilder.RenameIndex(
                name: "IX_DoctorHospitals_HospitalID",
                table: "DoctorHospital",
                newName: "IX_DoctorHospital_HospitalID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DoctorHospital",
                table: "DoctorHospital",
                columns: new[] { "DoctorID", "HospitalID" });

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorHospital_Doctors_DoctorID",
                table: "DoctorHospital",
                column: "DoctorID",
                principalTable: "Doctors",
                principalColumn: "DoctorID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorHospital_Hospitals_HospitalID",
                table: "DoctorHospital",
                column: "HospitalID",
                principalTable: "Hospitals",
                principalColumn: "HospitalID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
