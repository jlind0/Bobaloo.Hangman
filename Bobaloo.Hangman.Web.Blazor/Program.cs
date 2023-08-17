using Bobaloo.Hangman.Data.Core;
using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.TTS;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.UI;
using Bobaloo.Hangman.Business.Core;
using Bobaloo.Hangman.Business;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Bobaloo.Hangman.Web.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApi(builder.Configuration)
                    .EnableTokenAcquisitionToCallDownstreamApi()
                        .AddInMemoryTokenCaches();
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApp(builder.Configuration).EnableTokenAcquisitionToCallDownstreamApi();
builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder(
        JwtBearerDefaults.AuthenticationScheme,
        OpenIdConnectDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build();
    options.AddPolicy("IsAdmin", policy => { 
        policy.Requirements.Add(new CommaSeparatedRolesRequirement
        {
            Roles = new[] { "Tour.Admin" }
        });
    });

});

builder.Services.AddTokenAcquisition();
builder.Services.AddControllersWithViews();


builder.Services.AddRazorPages().AddMicrosoftIdentityUI();
builder.Services.AddServerSideBlazor()
    .AddMicrosoftIdentityConsentHandler();
builder.Services.AddSignalR();
builder.Services.AddLogging();
builder.Services.AddSingleton<IContextFactory, ContextFactory>();
builder.Services.AddSingleton<IAzureStorageBlob, AzureStorageBlob>();
builder.Services.AddSingleton<IRepository<HangmanUnitOfWork, Tour, Guid>, Repository<Tour, Guid>>();
builder.Services.AddSingleton<IRepository<HangmanUnitOfWork, TourLeg, Guid>, TourLegRepository>();
builder.Services.AddSingleton<IRepository<HangmanUnitOfWork, User, string>, Repository<User, string>>();
builder.Services.AddSingleton<ITourLegRepository<HangmanUnitOfWork>, TourLegRepository>();
builder.Services.AddSingleton<IAzureTTS, AzureTTS>();
builder.Services.AddSingleton<ITourBusiness, TourBusiness>();
builder.Services.AddSingleton<ITourLegBusiness, TourLegBusiness>();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
