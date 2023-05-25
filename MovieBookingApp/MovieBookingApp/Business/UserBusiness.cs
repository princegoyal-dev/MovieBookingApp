using AutoMapper;
using MovieBookingApp.Interfaces.IBusiness;
using MovieBookingApp.Interfaces.IRepository;
using MovieBookingApp.Models;

namespace MovieBookingApp.Business
{
    public class UserBusiness : IUserBusiness
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IIdentityBusiness _identityBusiness;

        public UserBusiness(IUserRepository userRepository, IMapper mapper, IIdentityBusiness identityBusiness)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _identityBusiness = identityBusiness;
        }

        public async Task<string> AddUser(UserDto user)
        {
            string userId = string.Empty;

            try
            {
                var existingUser = await _userRepository.GetUser(user.LoginId, user.Email);

                if (existingUser is null || string.IsNullOrEmpty(existingUser?.Id))
                {
                    _identityBusiness.CreatePasswordHashSalt(user.Password, out byte[] passwordHash, out byte[] passwordSalt);
                    userId = Guid.NewGuid().ToString();
                    var userModel = _mapper.Map<User>(user);
                    userModel.Id = userId;
                    userModel.PasswordHash = passwordHash;
                    userModel.PasswordSalt = passwordSalt;
                    var isInserted = await _userRepository.AddUser(userModel);

                    if (!isInserted)
                    {
                        userId = string.Empty;
                    }
                }
            }
            catch (Exception)
            {
                userId = string.Empty;
            }

            return userId;
        }

        public async Task<string> GetUserToken(string loginId, string password)
        {
            string token = string.Empty;
            try
            {
                var existingUserModel = await _userRepository.GetUserByLoginIdPassword(loginId, password);
                if (existingUserModel is not null)
                {
                    var isAuthorized = _identityBusiness.AuthorizeUser(existingUserModel.Password, existingUserModel.PasswordHash, existingUserModel.PasswordSalt);

                    if (isAuthorized)
                    {
                        token = _identityBusiness.CreateToken(existingUserModel);
                    }
                }
            }
            catch (Exception)
            {
                token = string.Empty;
            }

            return token;
        }

        public async Task<string> ChangePassword(string loginId, string newPassword)
        {
            string status = string.Empty;
            try
            {
                var existingUserModel = await _userRepository.GetUserByLoginId(loginId);
                if (existingUserModel is not null)
                {
                    _identityBusiness.CreatePasswordHashSalt(newPassword, out byte[] newPasswordHash, out byte[] newPasswordSalt);
                    existingUserModel.Password = newPassword;
                    existingUserModel.PasswordHash = newPasswordHash;
                    existingUserModel.PasswordSalt = newPasswordSalt;

                    var isUpdateSuccess = await _userRepository.UpdateUser(existingUserModel);

                    if (isUpdateSuccess)
                    {
                        status = "Password changed successfully";
                    }
                }
                else
                {
                    status = $"Incorrect username {loginId}";
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
