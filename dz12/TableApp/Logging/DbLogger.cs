using TableApp.Data;
using TableApp.Models;

namespace TableApp.Logging;

public class DbLogger : ILogger
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly string _categoryName;

    public DbLogger(IServiceScopeFactory scopeFactory, string categoryName)
    {
        _scopeFactory = scopeFactory;
        _categoryName = categoryName;
    }

    
    public IDisposable? BeginScope<TState>(TState state) where TState : notnull
    {
        return null;
    }

    public bool IsEnabled(LogLevel logLevel)
    {
        return logLevel >= LogLevel.Information;
    }

    public void Log<TState>(LogLevel logLevel, EventId eventId, TState state, Exception? exception, Func<TState, Exception?, string> formatter)
    {
        if (!IsEnabled(logLevel)) return;

        //создаем новый scope(потому что CommentsDbContext это Scoped-сервис и его нельзя использовать вне scope)
        using var scope = _scopeFactory.CreateScope();
        //получаем CommentsDbContext из текущего scope
        var db = scope.ServiceProvider.GetRequiredService<CommentsDbContext>();
        var logEntry = new Log
        {
            Message = formatter(state, exception),
            LogLevel = logLevel.ToString(),
            TimeStamp = DateTime.UtcNow,
        };

        db.Logs.Add(logEntry);
        db.SaveChanges();
    }
}
