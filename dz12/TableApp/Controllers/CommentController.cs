using Microsoft.AspNetCore.Mvc;
using TableApp.Models;
using TableApp.Services;

namespace TableApp.Controllers;

//Атрибут который указывает что этот класс является контроллером API
[ApiController]
//Атрибут определяет базовый маршрут для всех методов в этом контроллере.[controller] заменяется на имя контроллера (в данном случае comments)
[Route("[controller]")]
public class CommentsController : ControllerBase
{
    private readonly CommentService _service;
    private readonly ILogger<CommentsController> _logger;
    public CommentsController(CommentService service, ILogger<CommentsController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpGet]
    public IActionResult GetAll(){
        _logger.LogInformation("Все комментарии получены");
        return Ok(_service.GetAll());  //200
    } 

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {   
        _logger.LogInformation($"Комментарий получен: ID={id}");
        var comment = _service.GetById(id);
        return comment == null ? NotFound() : Ok(comment);  
    }

    [HttpPost]
    public IActionResult Add([FromBody] Comment comment)
    {
        _logger.LogInformation($"Комментарий добавлен: {comment.Name}");
        _service.Add(comment);
        return CreatedAtAction(nameof(GetById), new {id = comment.Id}, comment); //201
    }

    [HttpPatch("{id}")]
    public IActionResult Update(int id, [FromBody] Comment comment)
    {
        if (_service.GetById(id) == null) {
            return NotFound();  //404
        }

        _logger.LogInformation($"Комментарий обновлён: ID={id}");
        _service.Update(id, comment);
        return NoContent(); //204 
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        if (_service.GetById(id) == null) 
            return NotFound();

        _logger.LogInformation($"Комментарий удалён: ID={id}");
        _service.Delete(id);
        return NoContent();  //204
    }
}
