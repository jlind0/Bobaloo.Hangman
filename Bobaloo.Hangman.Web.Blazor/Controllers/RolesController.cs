using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Bobaloo.Hangman.Web.Blazor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        protected IRepository<HangmanUnitOfWork, User, string> UsersRepository { get; }
        protected ILogger Logger { get; }
        public RolesController(IRepository<HangmanUnitOfWork, User, string> userRepository, ILogger<RolesController> logger) 
        {
            UsersRepository = userRepository;
            Logger = logger;
        }
        public class RoleBody
        {
            public string extension_Roles { get; set; } = null!;
            public string version { get; set; } = "1.0.0";
            public string action { get; set; } = "continue";
        }
        [HttpPost("/permissions")]
        public async Task<RoleBody> GetUserPermissions([FromBody]JsonDocument message, CancellationToken token = default)
        {
            Logger.LogInformation(JsonSerializer.Serialize(message));

            var userId = message.RootElement.GetProperty("objectId").GetString() ?? throw new InvalidDataException();
            var user = await UsersRepository.GetByID(userId, token: token);
            if(user == null)
            {
                user = new User()
                {
                    UserId = userId,
                    Surname = message.RootElement.GetProperty("surname").GetString() ?? throw new InvalidDataException(),
                    GivenName = message.RootElement.GetProperty("givenName").GetString() ?? throw new InvalidDataException(),
                    Email = message.RootElement.GetProperty("email").GetString() ?? throw new InvalidDataException()
                };
                await UsersRepository.Add(user, token: token);
            }
            return new RoleBody()
            {
                extension_Roles = user.IsAdmin ? "Tour.Admin" : "Tour.Subscriber"
            };
        }
    }
}
