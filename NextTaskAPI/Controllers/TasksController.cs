using Microsoft.AspNetCore.Mvc;
using NextTaskAPI.Models;
using NextTaskAPI.Repositories;

namespace NextTaskAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : Controller
    {
        private readonly ITaskRepository _taskRepository;

        public TasksController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyTask>>> GetTasks()
        {
            return Ok(await _taskRepository.GetTasksAsync());
        }

        // GET: api/MyTask/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<MyTask>> GetTaskById(int id)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public async Task<ActionResult<MyTask>> AddTask(MyTask task)
        {
            await _taskRepository.AddTaskAsync(task);
            return CreatedAtAction(nameof(GetTasks), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, MyTask task)
        {
            if (id != task.Id) return BadRequest();
            await _taskRepository.UpdateTaskAsync(task);
            return NoContent();
        }


        // DELETE: api/MyTask/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _taskRepository.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            await _taskRepository.DeleteTaskAsync(id);
            return NoContent();
        }



    }
}


