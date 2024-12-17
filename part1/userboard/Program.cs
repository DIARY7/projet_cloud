using Microsoft.OpenApi.Models; // Pour Swagger
using Microsoft.EntityFrameworkCore; // Pour Entity Framework Core
using userboard.Data; // Pour votre DbContext

var builder = WebApplication.CreateBuilder(args);

// Ajouter les services pour les contrôleurs et les vues
builder.Services.AddControllersWithViews();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API Exemple",
        Version = "v1",
        Description = "Une API de démonstration avec Swagger"
    });
});

// Configurer la connexion à la base de données Postgres
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Spécifier l'URL du serveur
builder.WebHost.UseUrls("http://0.0.0.0:5015");

var app = builder.Build();

// Configurer le pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Exemple v1");
        c.RoutePrefix = string.Empty; // Swagger UI accessible à la racine
    });
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers();

app.Run();
