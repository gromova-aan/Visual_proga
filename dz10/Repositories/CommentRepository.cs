using dz10.Models;

namespace dz10.Repositories;

public class CommentRepository : ICommentRepository //реализует методы интерфейса ICommentRepository
{
    private readonly Dictionary<int, Comment> _comments = new(); //все комм хранятся в словаре

    public IEnumerable<Comment> GetAll() => _comments.Values;

    public Comment? GetById(int id) => _comments.GetValueOrDefault(id);

    public void Add(Comment comment)
    {
        _comments[comment.Id] = comment;
    }

    public void Update(int id, Comment updatedComment)
    {
        if (_comments.ContainsKey(id))
        {
            var existing = _comments[id];
            existing.PostId = updatedComment.PostId;
            existing.Name = updatedComment.Name;
            existing.Email = updatedComment.Email;
            existing.Body = updatedComment.Body;
        }
    }

    public void Delete(int id) => _comments.Remove(id);
}
