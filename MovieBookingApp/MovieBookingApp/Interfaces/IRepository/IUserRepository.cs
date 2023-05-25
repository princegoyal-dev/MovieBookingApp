using MovieBookingApp.Models;

namespace MovieBookingApp.Interfaces.IRepository
{
    public interface IUserRepository
    {
        public Task<bool> AddUser(User user);
        public Task<User> GetUser(string id);
        public Task<User> GetUser(string userId, string email);
        public Task<User> GetUserByLoginIdPassword(string loginId, string password);
        public Task<User> GetUserByLoginId(string loginId);
        public Task<List<User>> GetUsers();
        public Task<bool> UpdateUser(User user);
        public Task DeleteUser(string id);
    }
}
