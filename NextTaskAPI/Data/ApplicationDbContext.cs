using Microsoft.EntityFrameworkCore;
using NextTaskAPI.Models;

namespace NextTaskAPI.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<MyTask> MyTasks { get; set; }

    }
}
