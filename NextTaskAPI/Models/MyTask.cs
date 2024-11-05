using System.ComponentModel.DataAnnotations;

namespace NextTaskAPI.Models
{
    public class MyTask
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsCompleted { get; set; } = false;
        public bool IsMissed { get; set; } = false;
    }
}
