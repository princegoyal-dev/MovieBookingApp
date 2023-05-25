namespace MovieBookingApp.Models
{
    public class MovieDto
    {
        public string Name { get; set; } = string.Empty;
        public string TheatreName { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
    }
}
