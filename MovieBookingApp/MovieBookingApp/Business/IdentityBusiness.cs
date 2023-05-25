using Microsoft.IdentityModel.Tokens;
using MovieBookingApp.Interfaces.IBusiness;
using MovieBookingApp.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace MovieBookingApp.Business
{
    public class IdentityBusiness : IIdentityBusiness
    {
        private readonly IConfiguration _configuration;

        public IdentityBusiness(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void CreatePasswordHashSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public bool AuthorizeUser(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        public string CreateToken(User user)
        {
            string token = string.Empty;

            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Name, user.LoginId)
            };

            var value = _configuration.GetSection("AppSettings:Token").Value;

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var jwt = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            token = new JwtSecurityTokenHandler().WriteToken(jwt);

            return token;
        }
    }
}
