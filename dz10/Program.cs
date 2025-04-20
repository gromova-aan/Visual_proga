using dz10.Models;
using dz10.Repositories;
using dz10.Services;

var builder = WebApplication.CreateBuilder(args);

// Регистрируем репозиторий и сервис
builder.Services.AddSingleton<ICommentRepository, CommentRepository>();
builder.Services.AddSingleton<CommentService>();

// Добавляем CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // адрес, где работает React
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Подключаем CORS
app.UseCors("AllowFrontend");

// Маршруты
app.MapGet("/comments", (CommentService service) =>
{
    return Results.Ok(service.GetAll());
});

app.MapGet("/comments/{id:int}", (int id, CommentService service) =>
{
    var comment = service.GetById(id);
    return comment is not null ? Results.Ok(comment) : Results.NotFound();
});

app.MapPost("/comments", (Comment comment, CommentService service) =>
{
    service.Add(comment);
    return Results.Created($"/comments/{comment.Id}", comment);
});

app.MapPatch("/comments/{id:int}", (int id, Comment updated, CommentService service) =>
{
    var existing = service.GetById(id);
    if (existing is null) return Results.NotFound();

    service.Update(id, updated);
    return Results.Ok();
});

app.MapDelete("/comments/{id:int}", (int id, CommentService service) =>
{
    var comment = service.GetById(id);
    if (comment is null) return Results.NotFound();

    service.Delete(id);
    return Results.NoContent();
});

app.Run();
