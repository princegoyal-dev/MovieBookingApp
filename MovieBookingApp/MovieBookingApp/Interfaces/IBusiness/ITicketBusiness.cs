using MovieBookingApp.Models;

namespace MovieBookingApp.Interfaces.IBusiness
{
    public interface ITicketBusiness
    {
        public Task<string> AddTicket(TicketDto ticket);

        public Task<string> UpdateTicket(Ticket ticket);
        public Task<string> DeleteTicket(string id);
    }
}
