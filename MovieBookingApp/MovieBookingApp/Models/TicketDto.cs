
namespace MovieBookingApp.Models
{
    public class TicketDto
    { 
        public string MovieName { get; set; } = string.Empty;
       
        public string TheatreName { get; set; } = string.Empty;
        
        public int NumberOfTickets { get; set; }
        
        public string SeatNumber { get; set; } = string.Empty;
    }
}
