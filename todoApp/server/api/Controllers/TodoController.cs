using efscaffold.Entities;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    public class TodoController : ControllerBase
    {
        [Route(nameof(GetAllTodos))]
        [HttpGet]
        public async Task<ActionResult<List<Todo>>> GetAllTodos([FromServices] MyDbContext dbContext)
        {
            return dbContext.Todos.ToList();
        }

        [Route(nameof(CreateTodo))]
        [HttpPost]
        public async Task<ActionResult<List<Todo>>> CreateTodo([FromServices] MyDbContext dbContext)
        {
            var todo = new Todo
            {
                Description = "Test",
                Title = "TestTitle",
                Id = Guid.NewGuid().ToString(),
                Isdone = false,
                Priority = 1,
            };
        
            dbContext.Todos.Add(todo);
        }
    }
}
