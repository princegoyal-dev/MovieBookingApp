using MovieBookingApp.Models;

namespace MovieBookingApp.Interfaces.IBusiness
{
    public interface IMovieBusiness
    {
        public Task<List<MovieDto>> GetMovies();
        public Task<List<MovieDto>> SearchMovie(string movieName);

        public Task<TicketStatusResponse> UpdateMovieTicketStatus(string moviename, string ticket);

        public Task<DeleteMovieByNameAndIdResponse> DeleteMovieByNameAndId(string moviename, string id);
    }
}
