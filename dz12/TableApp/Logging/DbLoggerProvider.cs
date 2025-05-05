namespace TableApp.Logging;

//провайдер отвечает за создание ILogger
public class DbLoggerProvider : ILoggerProvider
{
    private readonly IServiceScopeFactory _scopeFactory;

    public DbLoggerProvider(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public ILogger CreateLogger(string categoryName)
    {
        return new DbLogger(_scopeFactory, categoryName);
    }

    public void Dispose() { }
}
