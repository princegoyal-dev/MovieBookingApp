using Microsoft.Extensions.Primitives;
using MovieBookingApp.Models;

namespace MovieBookingApp.Interfaces.IBusiness
{
    public interface IUserBusiness
    {
        public Task<string> AddUser(UserDto user);
        public Task<string> GetUserToken(string loginId, string password);
        public Task<string> ChangePassword(string loginId, string newPassword);
        public Task<string> ChangePassword(string loginId, string oldPassword, string newPassword);
        public Task<string> ValidateRequest(string loginId, StringValues headerValues);
    }
}
