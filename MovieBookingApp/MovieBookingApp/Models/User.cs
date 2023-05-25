using MongoDB.Bson.Serialization.Attributes;

namespace MovieBookingApp.Models
{
    public class User
    {
        [BsonId]
        public string Id { get; set; } = string.Empty;
        [BsonElement("firstname")]
        public string FirstName { get; set; } = string.Empty;
        [BsonElement("lastname")]
        public string LastName { get; set; } = string.Empty;
        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;
        [BsonElement("loginid")]
        public string LoginId { get; set; } = string.Empty;
        [BsonElement("password")]
        public string Password { get; set; } = string.Empty;
        [BsonElement("passwordHash")]
        public byte[] PasswordHash { get; set; } = default!;
        [BsonElement("passwordSalt")]
        public byte[] PasswordSalt { get; set; } = default!;
        [BsonElement("contact")]
        public string Contact { get; set; } = string.Empty;
    }
}
