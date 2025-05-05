using Microsoft.EntityFrameworkCore;
using TableApp.Repositories;
using TableApp.Services;
using TableApp.Data;
using TableApp.Logging;

var builder = WebApplication.CreateBuilder(args);

// Регистрация контекста с PostgreSQL
builder.Services.AddDbContext<CommentsDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Logging.ClearProviders(); 
builder.Logging.AddConsole(); 
builder.Logging.AddProvider(new DbLoggerProvider(
    builder.Services.BuildServiceProvider().GetRequiredService<IServiceScopeFactory>()));

//Scoped означает что новый экземпляр создается для каждого HTTP-запроса
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<CommentService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:3000") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

//Регистрируем все контроллеры (всё, что наследуется от ControllerBase)
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Регистрируем CommentRepository как Singleton — т.е. создаётся один объект на всё время жизни приложения
// builder.Services.AddSingleton<ICommentRepository, CommentRepository>();
// builder.Services.AddSingleton<CommentService>();

var app = builder.Build();

Program.ServiceProvider = app.Services;

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors();

//Добавляет маршрут для всех контроллеров, помеченных атрибутом [ApiController]
app.MapControllers();

app.Run();

// Глобальный сервис-провайдер (нужно для логгера)
public partial class Program
{
    public static IServiceProvider ServiceProvider { get; set; } = null!;
}