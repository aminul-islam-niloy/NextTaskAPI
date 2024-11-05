using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NextTaskAPI.Data;
using NextTaskAPI.Models;

namespace NextTaskAPI.Repositories
{
    public class MyTaskRepository: ITaskRepository
    {
        private readonly ApplicationDbContext _context;

        public MyTaskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MyTask>> GetTasksAsync()
        {
            return await _context.MyTasks
                .OrderBy(t => t.StartTime)
                .ThenBy(t => t.Name)
                .ToListAsync();
        }

        public async Task<MyTask> GetTaskByIdAsync(int id)

        {
           
            return await _context.MyTasks.FindAsync(id);
        }

        public async Task AddTaskAsync(MyTask task)
        {
            await _context.MyTasks.AddAsync(task);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateTaskAsync(MyTask task)
        {
            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteTaskAsync(int id)
        {
            var task = await _context.MyTasks.FindAsync(id);
            if (task != null)
            {
                _context.MyTasks.Remove(task);
                await _context.SaveChangesAsync();
            }
        }
    }
}
