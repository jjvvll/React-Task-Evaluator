namespace TaskManager.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsDone { get; set; }
        public int UserId { get; set; }
        
     [JsonIgnore] // This tells JSON to ignore this property
    public User User { get; set; } = null!;
    }
}