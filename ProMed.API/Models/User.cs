using System.ComponentModel.DataAnnotations;

namespace ProMed.API.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Parola { get; set; }

        public string Rol { get; set; }
    }

}
