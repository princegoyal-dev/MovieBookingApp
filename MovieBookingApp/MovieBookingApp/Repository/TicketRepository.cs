using AutoMapper;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;
using MovieBookingApp.Interfaces.IRepository;
using MovieBookingApp.Models;
using System.Net.Sockets;

namespace MovieBookingApp.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly IOptions<MongoDbConfig> _mongoDbConfig;
        private readonly IMongoCollection<Ticket> _tickets;
        private readonly IMongoCollection<Movie> _movies;
        private readonly IMapper _mapper;
        public TicketRepository(IOptions<MongoDbConfig> mongoDbConfig, IMongoClient mongoClient, IMapper mapper)
        {
            _mongoDbConfig = mongoDbConfig;
            _mapper = mapper;
            var database = mongoClient.GetDatabase(_mongoDbConfig.Value.DatabaseName);
            _tickets = database.GetCollection<Ticket>(_mongoDbConfig.Value.TicketCollectionName);
            _movies = database.GetCollection<Movie>(_mongoDbConfig.Value.MovieCollectionName);
        }

        public async Task<bool> AddTicket(Ticket ticket)
        {
            try
            {
                FilterDefinition<Movie> movieFilter = new ExpressionFilterDefinition<Movie>(d => d.Name == ticket.MovieName && d.TheatreName == ticket.TheatreName);

                var movies = _movies.FindAsync(movieFilter).Result.FirstOrDefaultAsync().Result;

                if(movies == null || movies.TicketsAlloted - movies.TicketsBooked == 0)
                {
                    return false;
                }

                if(movies.TicketsAlloted - movies.TicketsBooked < ticket.NumberOfTickets)
                {
                    return false;
                }

                FilterDefinition<Movie> filter = new ExpressionFilterDefinition<Movie>(d => d.Id == movies.Id);
                var update = Builders<Movie>.Update.Set("ticketsBooked", movies.TicketsBooked + ticket.NumberOfTickets);
                await _movies.UpdateOneAsync(filter, update);

                await _tickets.InsertOneAsync(ticket);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateTicket(Ticket ticket)
        {
            try
            {
                //Fetching Previous Ticket Details(Original Ticket)
                FilterDefinition<Ticket> ticketFilter = new ExpressionFilterDefinition<Ticket>(d => d.Id == ticket.Id);
                var ticketFetched = _tickets.FindAsync(ticketFilter).Result.FirstOrDefaultAsync().Result;
                if(ticketFetched == null)
                {
                    return false;
                }
                var ticketDiff = ticketFetched.NumberOfTickets - ticket.NumberOfTickets;

                //Fetching correspongding movie details
                FilterDefinition<Movie> movieFilter = new ExpressionFilterDefinition<Movie>(d => d.Name == ticket.MovieName && d.TheatreName == ticket.TheatreName);
                var movieFetched = _movies.FindAsync(movieFilter).Result.FirstOrDefaultAsync().Result;
                if(movieFetched == null)
                {
                    return false;
                }
                var availableTickets = movieFetched.TicketsAlloted - movieFetched.TicketsBooked;
                
                //Condition to check if updated ticket has more number of seat booking(number of tickets) than check in db if it has available seats or not
                if (movieFetched == null || (ticketDiff < 0 && availableTickets < Math.Abs(ticketDiff)))
                {
                    return false;
                }

                movieFilter = new ExpressionFilterDefinition<Movie>(d => d.Id == movieFetched.Id);

                UpdateDefinition<Movie> updateDefinitionMovie;

                if (ticketDiff < 0)
                {
                    updateDefinitionMovie = Builders<Movie>.Update.Set("ticketsBooked", movieFetched.TicketsBooked + Math.Abs(ticketDiff));
                } 
                else
                {
                    updateDefinitionMovie = Builders<Movie>.Update.Set("ticketsBooked", movieFetched.TicketsBooked - Math.Abs(ticketDiff));
                }
                await _movies.UpdateOneAsync(movieFilter, updateDefinitionMovie);

                FilterDefinition<Ticket> filter = new ExpressionFilterDefinition<Ticket>(d => d.Id == ticket.Id);
                UpdateDefinition<Ticket> updateDefinitionTicket1 = Builders<Ticket>.Update.Set("numberOfTickets", ticket.NumberOfTickets);
                UpdateDefinition<Ticket> updateDefinitionTicket2 = Builders<Ticket>.Update.Set("seatNumber", ticket.SeatNumber);
                await _tickets.UpdateOneAsync(filter, updateDefinitionTicket1);
                await _tickets.UpdateOneAsync(filter, updateDefinitionTicket2);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteTicket(string id)
        {
            try
            {
                //Fetching ticket corresponding to id
                FilterDefinition<Ticket> ticketFilter = new ExpressionFilterDefinition<Ticket>(d => d.Id == id);
                var ticketFetched = _tickets.FindAsync(ticketFilter).Result.FirstOrDefaultAsync().Result;
                if(ticketFetched == null)
                {
                    return false;
                }

                //Fetching corresponding movie details
                FilterDefinition<Movie> movieFilter = new ExpressionFilterDefinition<Movie>(d => d.Name == ticketFetched.MovieName && d.TheatreName == ticketFetched.TheatreName);
                var movieFetched = _movies.FindAsync(movieFilter).Result.FirstOrDefaultAsync().Result;
                if(movieFetched == null)
                {
                    return false;
                }

                //updating movie available ticket details
                UpdateDefinition<Movie> updateDefinitionMovie = Builders<Movie>.Update.Set("ticketsBooked", movieFetched.TicketsBooked - ticketFetched.NumberOfTickets);
                await _movies.UpdateOneAsync(movieFilter, updateDefinitionMovie);

                //deleting ticket from db
                await _tickets.DeleteOneAsync(ticketFilter);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


    }
}
