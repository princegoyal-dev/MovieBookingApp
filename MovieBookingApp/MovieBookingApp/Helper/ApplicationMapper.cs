using AutoMapper;
using MovieBookingApp.Models;

namespace MovieBookingApp.Helper
{
    public class ApplicationMapper : Profile
    {
        public ApplicationMapper()
        {
            CreateMap<UserDto, User>().ReverseMap();

            CreateMap<Movie, MovieDto>()
                .ForMember(dto => dto.Name, map => map.MapFrom((entity => entity.Name)))
                .ForMember(dto => dto.TheatreName, map => map.MapFrom((entity => entity.TheatreName)))
                .ForMember(dto => dto.IsAvailable, map => map.MapFrom((entity => entity.TicketsAlloted - entity.TicketsBooked > 0)));

            CreateMap<TicketDto, Ticket>().ReverseMap();
        }
    }
}
