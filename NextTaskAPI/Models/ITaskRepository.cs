using NextTaskAPI.Models;

namespace NextTaskAPI.Models
{
    public interface ITaskRepository
    {
        Task<IEnumerable<MyTask>> GetTasksAsync();
        Task<MyTask> GetTaskByIdAsync(int id);
        Task AddTaskAsync(MyTask task);
        Task UpdateTaskAsync(MyTask task);
        Task DeleteTaskAsync(int id);
    }
}
