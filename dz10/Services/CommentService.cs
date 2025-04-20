using dz10.Models;
using dz10.Repositories;

namespace dz10.Services;

public class CommentService //типо сервер
{
    private readonly ICommentRepository _repository; //поле для хранения репозитория типа ICommentRepository

    public CommentService(ICommentRepository repository)
    {
        _repository = repository; //сервер запоминает какой использовать реп
    }

    public IEnumerable<Comment> GetAll() => _repository.GetAll();
    public Comment? GetById(int id) => _repository.GetById(id);
    public void Add(Comment comment) => _repository.Add(comment);
    public void Update(int id, Comment comment) => _repository.Update(id, comment);
    public void Delete(int id) => _repository.Delete(id);
}
