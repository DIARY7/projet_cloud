using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using userboard.Models;
using userboard.Data;
using userboard.Utils;
using userboard.Dto;

namespace userboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly MultiAuthCache _multiAuthCache;

        // Injection de dépendances pour AppDbContext et MultiAuthCache
        public UsersController(AppDbContext context, MultiAuthCache multiAuthCache)
        {
            _context = context;
            _multiAuthCache = multiAuthCache;
        }
        // GET: api/Users
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

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
        public async Task<IActionResult> CreateUserToCache(User user)
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

            var pin = Generator.GenererPin(6);
            var pinHtml = EmailService.GetPinHtml(pin);

            EmailService.SendEmail(user.Email,"Confirmation inscription",pinHtml);

            UserCacheInfo userCache = new UserCacheInfo(user,pin);

            _multiAuthCache.AddUserToCache(userCache);

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new
            {
                status = "success",
                datas = user,
                error = "null"
            });
        }
        [HttpPost("/confirm")]
        public async Task<IActionResult> ValidateUser(PinSent pinSent)
        {
            var userCache = _multiAuthCache.GetUserCacheInfo(pinSent.Email);

            if(userCache==null){
                return BadRequest(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "pin expiré ou email non inscrit"
                });
            }

            if(!_multiAuthCache.ValidatePin(pinSent.Email, pinSent.Pin)){
                 return BadRequest(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "pin incorrect"
                });
            }

            var newuser = userCache.User;

            // hashage de pwd
            var pwdhached = Hasher.HashString(newuser.Password);
            newuser.Password = pwdhached;

            // initialisation de creation et modification
            newuser.CreatedAt = DateTime.UtcNow;
            newuser.UpdatedAt = DateTime.UtcNow;

            // nb tentatives
            newuser.NAttempt = 0;

            _context.Users.Add(newuser);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                status = "success",
                datas = userCache.User,
                error = "null"
            });
        }
// ===========================================================================
    /*
        Fonction Login
    */

    // public IActionResult VerifyLogin(LoginResponse login){
        
    // }
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
