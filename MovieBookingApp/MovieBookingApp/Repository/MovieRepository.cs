using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MovieBookingApp.Interfaces.IRepository;
using MovieBookingApp.Models;

namespace MovieBookingApp.Repository
{
    public class MovieRepository : IMovieRepository
    {
        private readonly IOptions<MongoDbConfig> _mongoDbConfig;
        private readonly IMongoCollection<Movie> _movies;

        public MovieRepository(IOptions<MongoDbConfig> mongoDbConfig, IMongoClient mongoClient)
        {
            _mongoDbConfig = mongoDbConfig;

            var database = mongoClient.GetDatabase(_mongoDbConfig.Value.DatabaseName);
            _movies = database.GetCollection<Movie>(_mongoDbConfig.Value.MovieCollectionName);
        }
        public async Task<List<Movie>> GetMovies()
        {
            var movies = await _movies.FindAsync(movie => true);
            return movies.ToList();
        }

        public async Task<List<Movie>> SearchMovie(string movieName)
        {
            var movies = await _movies.FindAsync<Movie>(
                Builders<Movie>.Filter.Regex("name", new BsonRegularExpression(movieName, "i")));

            return movies.ToList();
        }

        //public async Task<ActionResult> GetIsAvailable(MovieDto movieDto)
        //{
        //    TicketStatusResponse response = new TicketStatusResponse();
        //}
    }
}
