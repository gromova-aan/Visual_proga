namespace TableApp.Models;

public class Log
{
    public int Id {get; set;}
    public DateTime TimeStamp {get; set;} = DateTime.UtcNow;
    public string LogLevel {get; set;} = string.Empty;
    public string Message {get; set;} = string.Empty;
}
