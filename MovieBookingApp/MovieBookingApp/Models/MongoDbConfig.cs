namespace MovieBookingApp.Models
{
    public class MongoDbConfig
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string UserCollectionName { get; set; } = string.Empty;
        public string MovieCollectionName { get; set; } = string.Empty;
        public string TicketCollectionName { get; set; } = string.Empty;

    }
}
