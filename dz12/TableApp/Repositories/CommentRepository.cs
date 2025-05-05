using TableApp.Models;
using TableApp.Data;
using Microsoft.EntityFrameworkCore;

namespace TableApp.Repositories;

public class CommentRepository : ICommentRepository
{
    // private readonly Dictionary<int, Comment> _comments = new();

    private readonly CommentsDbContext _context;

    public CommentRepository(CommentsDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Comment> GetAll() => _context.Comments.AsNoTracking().ToList();

    public Comment? GetById(int id) => _context.Comments.Find(id);

    public void Add(Comment comment)
    {
        _context.Comments.Add(comment);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var comment = _context.Comments.Find(id);
        if (comment is not null)
        {
            _context.Comments.Remove(comment);
            _context.SaveChanges();
        }
        
    }


    public void Update(int id, Comment comment)
    {
        var existing = _context.Comments.Find(id);
        if (existing is not null) {
            existing.Name = comment.Name;
            existing.Email = comment.Email;
            existing.Body = comment.Body;
            existing.PostId = comment.PostId;

            _context.SaveChanges();
        }
    }
}
