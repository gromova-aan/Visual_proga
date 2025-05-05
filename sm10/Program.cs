using sam10.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<TodoRepository>();  

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Настройка Swagger (включаем всегда, не только в Development)
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.MapControllers();

app.Run();