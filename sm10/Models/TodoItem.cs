using System;
namespace sam10.Models;

public class TodoItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsCompleted { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public TodoItem() { }
    public TodoItem(string title, string? description = null)
    {
        Title = title;
        Description = description ?? string.Empty;
    }

}
