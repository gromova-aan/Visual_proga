using Microsoft.AspNetCore.Mvc;
using sam10.Models;
using sam10.Repository;

namespace sam10.Controllers;

[ApiController]
[Route("api/todo")]    
public class TodoController : ControllerBase
{
    private readonly TodoRepository _repository;

    public TodoController(TodoRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public ActionResult<IEnumerable<TodoItem>> GetAll()
    {
        return Ok(_repository.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<TodoItem> Get(int id)
    {
        var todoItem = _repository.GetById(id);
        return todoItem == null ? NotFound() : Ok(todoItem);
    }

    [HttpPost]
    public ActionResult<TodoItem> Post([FromBody] TodoItem todoItem)
    {
        if (todoItem == null)
        {
            return BadRequest("Title is required");
        }

        var addedItem = _repository.Add(todoItem);
        return CreatedAtAction(nameof(Get), new { id = addedItem.Id }, addedItem);
    }

    [HttpPut("{id}")]
    public ActionResult<TodoItem> Put(int id, [FromBody] TodoItem updatedItem)
    {
        if (updatedItem == null)
        {
            return BadRequest("Title is required");
        }

        var existingItem = _repository.Update(id, updatedItem);
        return existingItem == null ? NotFound() : Ok(existingItem);
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        return _repository.Delete(id) ? NoContent() : NotFound();
    }
}