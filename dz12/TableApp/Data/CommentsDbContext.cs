using Microsoft.EntityFrameworkCore;
using TableApp.Models;

namespace TableApp.Data;

public class CommentsDbContext : DbContext
{
    //DbSet<Comment> — это коллекция объектов типа Comment, которая представляет собой таблицу в базе данных
    public DbSet<Comment> Comments => Set<Comment>();
    public DbSet<Log> Logs => Set<Log>();

    public CommentsDbContext(DbContextOptions<CommentsDbContext> options) : base(options) { }
}
