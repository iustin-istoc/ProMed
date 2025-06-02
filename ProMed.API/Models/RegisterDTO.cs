namespace ProMed.API.Models
{
    public class RegisterDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Parola { get; set; } = string.Empty;
        public string Rol { get; set; } = string.Empty;

        public string FullName { get; set; } = string.Empty;
        public string CNP { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
    }
}
