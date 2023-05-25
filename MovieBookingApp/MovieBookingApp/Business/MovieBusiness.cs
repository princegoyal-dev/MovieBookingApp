using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MovieBookingApp.Interfaces.IBusiness;
using MovieBookingApp.Interfaces.IRepository;
using MovieBookingApp.Models;

namespace MovieBookingApp.Business
{
    public class MovieBusiness : IMovieBusiness
    {
        private readonly IMovieRepository _movieRepository;
        private readonly IMapper _mapper;
        private readonly IMongoCollection<Movie> _movies;
        private readonly IOptions<MongoDbConfig> _mongoDbConfig;

        public MovieBusiness(IMovieRepository movieRepository, IMapper mapper, IMongoClient mongoClient, IOptions<MongoDbConfig> mongoDbConfig)
        {
            _mongoDbConfig = mongoDbConfig;
            _movieRepository = movieRepository;
            _mapper = mapper;
            var database = mongoClient.GetDatabase(_mongoDbConfig.Value.DatabaseName);
            _movies = database.GetCollection<Movie>(_mongoDbConfig.Value.MovieCollectionName);
        }
        public async Task<List<MovieDto>> GetMovies()
        {
            List<MovieDto> moviesView;
            try
            {
                var moviesModel = await _movieRepository.GetMovies();
                moviesView = _mapper.Map<List<MovieDto>>(moviesModel);
            }
            catch (Exception)
            {
                moviesView = new();
            }

            return moviesView;
        }

        public async Task<List<MovieDto>> SearchMovie(string movieName)
        {
            List<MovieDto> moviesView;
            try
            {
                var moviesModel = await _movieRepository.SearchMovie(movieName);
                moviesView = _mapper.Map<List<MovieDto>>(moviesModel);
            }
            catch (Exception)
            {
                moviesView = new();
            }

            return moviesView;
        }

        public async Task<TicketStatusResponse> UpdateMovieTicketStatus(string moviename, string ticket)
        {
            TicketStatusResponse response = new TicketStatusResponse();
            //MovieDto movieDto = new MovieDto(); 
            //Movie movie = new Movie();

            response.IsSuccess = true;
            response.Message = "Movie ticket status updated";

            try
            {
                var Filter = new BsonDocument()
                    .Add("ticketStatus", ticket);

                var updateDoc = new BsonDocument("$set", Filter);

                var Result = await _movies.UpdateOneAsync(x => x.Name == moviename, updateDoc);

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }
            return response;
        }

        public async Task<DeleteMovieByNameAndIdResponse> DeleteMovieByNameAndId(string moviename, string id)
        {
            DeleteMovieByNameAndIdResponse response = new DeleteMovieByNameAndIdResponse();
            response.IsSuccess = true;
            response.Message = $"Movie {moviename} deleted successfully";

            try
            {

                var result = await _movies.DeleteOneAsync(x => x.Id == id);
                if (!result.IsAcknowledged)
                {
                    response.IsSuccess = false;
                    response.Message = $"Movie with {id} Not Found, Please enter valid Id";
                }

            }
            catch (Exception ex)
            {
                response.IsSuccess = false;
                response.Message = "Exception Occurs : " + ex.Message;
            }

            return response;
        }
    }
}
