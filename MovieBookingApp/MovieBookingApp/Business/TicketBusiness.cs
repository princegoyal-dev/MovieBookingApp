using AutoMapper;
using MovieBookingApp.Interfaces.IBusiness;
using MovieBookingApp.Interfaces.IRepository;
using MovieBookingApp.Models;
using MovieBookingApp.Repository;

namespace MovieBookingApp.Business
{
    public class TicketBusiness : ITicketBusiness
    {
        private readonly ITicketRepository _ticketRepository;
        private readonly IMapper _mapper;
        public TicketBusiness(ITicketRepository ticketRepository, IMapper mapper)
        {
            _ticketRepository = ticketRepository;
            _mapper = mapper;
        }

        public async Task<string> AddTicket(TicketDto ticket)
        {
            //string userId = string.Empty;
            string status = string.Empty;
            try
            {
                //var existingUser = await _ticketRepository.GetUser(user.LoginId, user.Email);
                //var existingTicketModel = await _ticketRepository.GetMovieByMovieName(moviename);

                //_identityBusiness.CreatePasswordHashSalt(user.Password, out byte[] passwordHash, out byte[] passwordSalt);
                //userId = Guid.NewGuid().ToString();
                
                var ticketModel = _mapper.Map<Ticket>(ticket);
                ticketModel.Id = Guid.NewGuid().ToString();
                //userModel.Id = userId;
                //userModel.PasswordHash = passwordHash;
                //userModel.PasswordSalt = passwordSalt;
                var isTicketInserted = await _ticketRepository.AddTicket(ticketModel);

                if (isTicketInserted)
                {
                    status = "Ticket booked successfully";
                }
                else
                {
                    status = "Ticket booking failed";
                }
                
            }
            catch (Exception)
            {
                status = string.Empty;
            }

            return status;
        }
        public async Task<string> UpdateTicket(Ticket ticket)
        {
            //string userId = string.Empty;
            string status = string.Empty;
            try
            {
                var isTicketUpdated = await _ticketRepository.UpdateTicket(ticket);

                if (isTicketUpdated)
                {
                    status = "Ticket Updated successfully";
                }
                else
                {
                    status = "Ticket Upadation failed";
                }
                
            }
            catch (Exception)
            {
                status = string.Empty;
            }

            return status;
        }
        public async Task<string> DeleteTicket(string id)
        {
            string status = string.Empty;
            try
            {
                var isTicketDeleted = await _ticketRepository.DeleteTicket(id);

                if (isTicketDeleted)
                {
                    status = "Ticket Deleted successfully";
                }
                else
                {
                    status = "Ticket Deletion failed";
                }
                
            }
            catch (Exception)
            {
                status = string.Empty;
            }

            return status;
        }
    }
}
