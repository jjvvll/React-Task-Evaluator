using TaskManager.Data;
using TaskManager.Models;

namespace TaskManager.Seeders
{
    public static class UserSeeder
    {
        public static void Seed(ApplicationDbContext context)
        {
            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User { Email = "admin@example.com", PasswordHash = "password" },
                    new User { Email = "john@example.com", PasswordHash = "password" },
                    new User { Email = "jane@example.com", PasswordHash = "password" }
                };

                context.Users.AddRange(users);
                context.SaveChanges();

                Console.WriteLine("Seeded Users successfully!");
            }
            else
            {
                Console.WriteLine("Users already exist. Skipping seeding.");
            }
        }
    }
}
