using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using userboard.Models;
using userboard.Data;

namespace userboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.Include(u => u.Role).ToListAsync();

            return Ok(new
            {
                status = "success",
                datas = users,
                error = "null"
            });
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users
                                     .Include(u => u.Role)
                                     .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "Utilisateur non trouvé"
                });
            }

            return Ok(new
            {
                status = "success",
                datas = user,
                error = "null"
            });
        }

        // POST: api/Users
        [HttpPost]
        public async Task<IActionResult> CreateUser(User user)
        {
            if (_context.Users.Any(u => u.Email == user.Email))
            {
                return BadRequest(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "L'email existe déjà."
                });
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new
            {
                status = "success",
                datas = user,
                error = "null"
            });
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "ID utilisateur invalide."
                });
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound(new
                    {
                        status = "failed",
                        datas = (object)null,
                        error = "Utilisateur non trouvé."
                    });
                }
                else
                {
                    throw;
                }
            }

            return Ok(new
            {
                status = "success",
                datas = user,
                error = "null"
            });
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "Utilisateur non trouvé."
                });
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                status = "success",
                datas = user,
                error = "null"
            });
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
