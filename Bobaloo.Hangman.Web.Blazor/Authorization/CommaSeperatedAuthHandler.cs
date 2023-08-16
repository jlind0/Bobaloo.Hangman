using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

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
