using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MovieBookingApp.Interfaces.IRepository;
using MovieBookingApp.Models;

namespace MovieBookingApp.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private readonly IOptions<MongoDbConfig> _mongoDbConfig;
        private readonly IMongoCollection<Ticket> _tickets;
        private readonly IMongoCollection<Movie> _movies;
        public TicketRepository(IOptions<MongoDbConfig> mongoDbConfig, IMongoClient mongoClient)
        {
            _mongoDbConfig = mongoDbConfig;

            var database = mongoClient.GetDatabase(_mongoDbConfig.Value.DatabaseName);
            _tickets = database.GetCollection<Ticket>(_mongoDbConfig.Value.TicketCollectionName);
            _movies = database.GetCollection<Movie>(_mongoDbConfig.Value.MovieCollectionName);
        }

        public async Task<bool> AddTicket(Ticket ticket)
        {
            try
            {
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
                FilterDefinition<Ticket> filter = new ExpressionFilterDefinition<Ticket>(d => d.Id == ticket.Id);
                await _tickets.ReplaceOneAsync(filter, ticket, new UpdateOptions { IsUpsert = true });
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
                FilterDefinition<Ticket> filter = new ExpressionFilterDefinition<Ticket>(d => d.Id == id);
                await _tickets.DeleteOneAsync(filter);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }


    }
}
