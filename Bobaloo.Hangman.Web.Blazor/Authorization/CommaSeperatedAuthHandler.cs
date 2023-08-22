using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
namespace Bobaloo.Hangman.Web.Authorization
{
    public class CommaSeparatedRolesRequirement : AuthorizationHandler<CommaSeparatedRolesRequirement>, IAuthorizationRequirement
    {
        public string[] Roles { get; set; } = null!;
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, CommaSeparatedRolesRequirement requirement)
        {
            if (context.User.HasClaim(c => c.Type == "extension_Roles"))
            {
                var rolesClaim = context.User.FindFirst(c => c.Type == "extension_Roles") ?? throw new InvalidDataException();
                var roles = rolesClaim.Value.Split(',').Select(role => role.Trim());

                if (roles.All(role => requirement.Roles.Contains(role.Trim())))
                {
                    context.Succeed(requirement);
                }
            }

            return Task.CompletedTask;
        }
    }

    public static class AuthorizationExtensions
    {
        public static bool HasSubscription(this ClaimsPrincipal? user, Guid tourId)
        {
            if (user == null)
                return false;
            var roles = user.FindFirst("extension_Roles");
            if (roles != null && roles.Value.Split(',').Any(c => c == "Tour.Admin"))
                return true;
            var subscriptions = user.FindFirst("extension_Subscriptions");
            if (subscriptions != null && subscriptions.Value.Split(',').Any(c => Guid.Parse(c) == tourId))
                return true;
            return false;

        }
        public static bool IsAdmin(this ClaimsPrincipal? user)
        {
            if (user == null)
                return false;
            var roles = user.FindFirst("extension_Roles");
            if (roles != null && roles.Value.Split(',').Any(c => c == "Tour.Admin"))
                return true;
            return false;
        }
    }
}
