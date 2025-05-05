using sam10.Models;

namespace sam10.Repository;

public class TodoRepository
{
    private readonly Dictionary<int,TodoItem> _todoItems = new Dictionary<int, TodoItem>();
    private int _nextId = 1;

    public IEnumerable<TodoItem> GetAll()
    {
        return _todoItems.Values;
    }

    public TodoItem? GetById(int id)
    {
        return _todoItems.TryGetValue(id, out TodoItem? value) ? value : null;
    }

    public TodoItem Add(TodoItem item) 
    {
        item.Id = _nextId++;
        _todoItems[item.Id] = item;
        return item;
    }

    public TodoItem? Update(int id, TodoItem updatedItem)
    {
        if(_todoItems.ContainsKey(id))
        {
            updatedItem.Id = id;
            _todoItems[id] = updatedItem;
            return updatedItem;
        }
        return null;
    }

    public bool Delete(int id)
    {
        return _todoItems.Remove(id);
    }
}

