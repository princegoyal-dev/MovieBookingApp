using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using MovieBookingApp.Filters;
using MovieBookingApp.Interfaces.IBusiness;
using MovieBookingApp.Models;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Net.Sockets;
using System.Security.Claims;

namespace MovieBookingApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class MovieBookingController : ControllerBase
    {
        private readonly IUserBusiness _userBusiness;
        private readonly IMovieBusiness _movieBusiness;
        private readonly ITicketBusiness _ticketBusiness;

        public MovieBookingController(IUserBusiness userBusiness, IMovieBusiness movieBusiness, ITicketBusiness ticketBusiness)
        {
            _userBusiness = userBusiness;
            _movieBusiness = movieBusiness;
            _ticketBusiness = ticketBusiness;
        }

        [HttpPost("Register")]
        [ServiceFilter(typeof(NullCheckFilter))]
        public async Task<ActionResult> Register(UserDto user)
        {
            var userId = await _userBusiness.AddUser(user);

            if (!string.IsNullOrEmpty(userId))
            {
                return Created("", userId);
            }
            else
            {
                return BadRequest("User already exists");
            }
        }

        [HttpGet("Login")]
        public async Task<ActionResult<string>> Login(string loginId, string password)
        {
            var token = await _userBusiness.GetUserToken(loginId, password);

            if (!string.IsNullOrEmpty(token))
            {
                return Ok(token);
            }
            else
            {
                return BadRequest("Incorrect LoginId or Password");
            }
        }
        [Authorize]
        [HttpGet("{loginId}/Forgot")]
        public async Task<ActionResult<string>> Forgot(string loginId, string newPassword)
        {
            StringValues headerValues;
            Request.Headers.TryGetValue("Authorization", out headerValues);
            string jwt = headerValues[0].Substring(7);
            var token = $"{jwt}";
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token);
            var tokenS = jsonToken as JwtSecurityToken;

            if(tokenS == null)
            {
                return BadRequest("Bad Request");
            }
            var jti = tokenS.Claims.First(claim => claim.Type == ClaimTypes.Name).Value;

            string passwordChangedStatus = "";
            if (loginId == jti)
            {
                passwordChangedStatus = await _userBusiness.ChangePassword(loginId, newPassword);
            } 
            else
            {
                passwordChangedStatus = "Not Authorized";
                return Unauthorized();
            }

            if (!string.IsNullOrEmpty(passwordChangedStatus))
            {
                return Ok(passwordChangedStatus);
            }
            return BadRequest(passwordChangedStatus);
        }

        [Authorize]
        [HttpGet("All")]
        public async Task<ActionResult<List<MovieDto>>> ViewAllMovies()
        {
            List<MovieDto>? movies = await _movieBusiness.GetMovies();

            if (movies is not null && movies.Count > 0)
            {
                return Ok(movies);
            }
            return NoContent();
        }
        [Authorize]
        [HttpGet("Movies/Search/MovieName")]
        public async Task<ActionResult<MovieDto>> SearchMovie(string movieName)
        {
            var movies = await _movieBusiness.SearchMovie(movieName);

            if (movies is not null && movies.Count > 0)
            {
                return Ok(movies);
            }
            return NoContent();
        }
        [Authorize]
        [HttpPost("{moviename}/add")]
        [ServiceFilter(typeof(NullCheckFilter))]
        public async Task<ActionResult<string>> AddTickets(TicketDto ticket)
        {
            var status = await _ticketBusiness.AddTicket(ticket);

            if (!string.IsNullOrEmpty(status))
            {
                return Ok(status);
            }
            return BadRequest(status);
        }
        [Authorize]
        [HttpPost("{moviename}/delete/{id}")]
        [ServiceFilter(typeof(NullCheckFilter))]
        public async Task<ActionResult<string>> DeleteTickets([FromRoute]string id = null)
        {
            var status = await _ticketBusiness.DeleteTicket(id);

            if (!string.IsNullOrEmpty(status))
            {
                return Ok(status);
            }
            return BadRequest(status);
        }
        [Authorize]
        [HttpPost("{moviename}/update/{ticket}")]
        [ServiceFilter(typeof(NullCheckFilter))]
        public async Task<ActionResult<string>> UpdateTicket(Ticket ticket)
        {
            var status = await _ticketBusiness.UpdateTicket(ticket);

            if (!string.IsNullOrEmpty(status))
            {
                return Ok(status);
            }
            return BadRequest(status);
        }

    }
}
