using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TableApp.Data;

namespace TableApp.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LogsController : ControllerBase
{
    private readonly CommentsDbContext _context;

    public LogsController(CommentsDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] string? level,
        [FromQuery] string? search,
        [FromQuery] DateTime? from,
        [FromQuery] DateTime? to)
    {
        var logs = _context.Logs.AsQueryable();

        if (!string.IsNullOrEmpty(level))
            logs = logs.Where(l => l.LogLevel == level);

        if (!string.IsNullOrEmpty(search))
            logs = logs.Where(l => l.Message.Contains(search));

        if (from.HasValue)
            logs = logs.Where(l => l.TimeStamp >= from.Value);

        if (to.HasValue)
            logs = logs.Where(l => l.TimeStamp <= to.Value);

        return Ok(await logs.OrderByDescending(l => l.TimeStamp).ToListAsync());
    }
}
