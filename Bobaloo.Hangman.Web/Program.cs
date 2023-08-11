using Bobaloo.Hangman.Data;
using Bobaloo.Hangman.Data.Core;
using Bobaloo.Hangman.TTS;
using Bobaloo.Hangman.Web.Hubs;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Identity.Web;
using Microsoft.Identity.Web.UI;

var builder = WebApplication.CreateBuilder(args);

var initialScopes = builder.Configuration["DownstreamApi:Scopes"]?.Split(' ') ?? builder.Configuration["MicrosoftGraph:Scopes"]?.Split(' ');

// Add services to the container.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApi(builder.Configuration)
                    .EnableTokenAcquisitionToCallDownstreamApi()
                        .AddMicrosoftGraph(builder.Configuration.GetSection("DownstreamApi"))
                        .AddInMemoryTokenCaches();
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme).AddMicrosoftIdentityWebApp(builder.Configuration).EnableTokenAcquisitionToCallDownstreamApi();
builder.Services.AddAuthorization(options =>
{
    options.DefaultPolicy = new AuthorizationPolicyBuilder(
        JwtBearerDefaults.AuthenticationScheme,
        OpenIdConnectDefaults.AuthenticationScheme).RequireAuthenticatedUser().Build();
});
builder.Services.AddSingleton<IContextFactory, ContextFactory>();
builder.Services.AddScoped<IRepository<HangmanUnitOfWork, Tour, Guid>, Repository<Tour, Guid>>();
builder.Services.AddScoped<IRepository<HangmanUnitOfWork, TourWithBinaryData, Guid>, Repository<TourWithBinaryData, Guid>>();
builder.Services.AddScoped<IRepository<HangmanUnitOfWork, TourLeg, Guid>, Repository<TourLeg, Guid>>();
builder.Services.AddScoped<IRepository<HangmanUnitOfWork, VoiceActor, int>, Repository<VoiceActor, int>>();
builder.Services.AddSingleton<ITTSCleint, FakeYouClient>();
builder.Services.AddSingleton<IGoogleStorageClient, GoogleStorageClient>();
builder.Services.AddSignalR();
builder.Services.AddControllers();
builder.Services.AddRazorPages()
    .AddMicrosoftIdentityUI();
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

app.MapRazorPages();
app.MapControllers();
app.MapHub<TTSHub>("/hubs/tts");
app.Run();
