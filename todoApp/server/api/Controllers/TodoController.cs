using efscaffold.Entities;
using Infrastructure.Postgres.Scaffolding;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    public class TodoController([FromServices] MyDbContext dbContext) : ControllerBase
    {
        [Route(nameof(GetAllTodos))]
        [HttpGet]
        public async Task<ActionResult<List<Todo>>> GetAllTodos()
        {
            var todos = await dbContext.Todos.ToListAsync();
            return Ok(todos);
        }

        [Route(nameof(CreateTodo))]
        [HttpPost]
        public async Task<ActionResult<List<Todo>>> CreateTodo([FromBody] CreateTodoDto dto)
        {
            var todo = new Todo
            {
                Description = dto.Description,
                Title = dto.Title,
                Id = Guid.NewGuid().ToString(),
                Isdone = false,
                Priority = dto.Priority,
            };

            dbContext.Todos.Add(todo);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
        }
        [Route(nameof(GetTodoById) + "/{id}")]
        [HttpGet]
        public async Task<ActionResult<Todo>> GetTodoById(string id)
        {
            var todo = await dbContext.Todos.FindAsync(id);
            if (todo is null) return NotFound();
            return Ok(todo);
        }
    }
}
