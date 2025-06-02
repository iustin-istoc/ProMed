using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ProMed.API.Data;
using ProMed.API.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProMed.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginData)
        {
            var user = _context.Utilizatori
                .FirstOrDefault(u => u.Email == loginData.Email && u.Parola == loginData.Parola);

            if (user == null)
                return Unauthorized("Email sau parolă greșite");

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Rol)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                role = user.Rol
            });
        }
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterDTO dto)
        {
            var exista = _context.Utilizatori.Any(u => u.Email == dto.Email);
            if (exista)
                return BadRequest("Email deja folosit");

            var user = new User
            {
                Email = dto.Email,
                Parola = dto.Parola,
                Rol = dto.Rol
            };

            _context.Utilizatori.Add(user);
            _context.SaveChanges();

            if (dto.Rol == "Pacient")
            {
                var pacient = new Patient
                {
                    FullName = dto.FullName,
                    Email = dto.Email,
                    CNP = dto.CNP,
                    Phone = dto.Phone,
                    DateOfBirth = dto.DateOfBirth
                };

                _context.Patients.Add(pacient);
                _context.SaveChanges();
            }

            return Ok();
        }



    }
}
