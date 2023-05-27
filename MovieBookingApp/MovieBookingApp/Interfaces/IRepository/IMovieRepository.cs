using Microsoft.AspNetCore.Mvc;
using MovieBookingApp.Models;

namespace MovieBookingApp.Interfaces.IRepository
{
    public interface IMovieRepository
    {
        public Task<List<Movie>> GetMovies();
        public Task<List<Movie>> SearchMovie(string movieName);
        public Task<bool> AddMovie(Movie movie);

        //public Task<ActionResult> GetIsAvailable(MovieDto movieDto);
    }
}
