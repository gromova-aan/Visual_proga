using dz10.Models;

namespace dz10.Repositories;

public interface ICommentRepository
{
    IEnumerable<Comment> GetAll(); //получить все комментарии
    Comment? GetById(int id); //по айди
    void Add(Comment comment); //добвить
    void Update(int id, Comment updatedComment); 
    void Delete(int id);
}
