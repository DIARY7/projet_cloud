using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
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
                datas? = users,
                error = (object)null
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
                error = (object)null
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

            EmailService.SendEmail(user.Email,"Confirmation Inscription",pinHtml);

            UserCacheInfo userCache = new UserCacheInfo(user,pin);

            _multiAuthCache.AddUserToCache(userCache);

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new
            {
                status = "success",
                datas = "1. Inscription réussie",
                error = (object)null
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
                    error = "Pin expiré ou email non-inscrit"
                });
            }

            if(!_multiAuthCache.ValidatePin(pinSent.Email, pinSent.Pin)){
                 return BadRequest(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "Pin incorrect"
                });
            }

            var newuser = userCache.User;

            // hashage de pwd
            var pwdhached = Hasher.HashString(newuser.Password);
            newuser.Password = pwdhached;

            // initialisation de creation et modification
            newuser.CreatedAt = DateTime.Now;
            newuser.UpdatedAt = DateTime.Now;

            // nb tentatives
            newuser.NAttempt = 0;

            _context.Users.Add(newuser);
            await _context.SaveChangesAsync();
            _multiAuthCache.RemoveUserFromCache(newuser.Email);
            return Ok(new
            {
                status = "success",
                datas = "2. Inscription réussie",
                error = (object)null
            });
        }
        // ===========================================================================
        /*
            Fonction Login
        */
        [HttpPost("/login")] 
        public async Task<IActionResult> Login(LoginResponse loginJson)
        {
            var email = loginJson.Login;
            if(!_context.Users.Any(e => e.Email == email))
            {
                return NotFound(new
                    {
                        status = "failed",
                        datas = (object)null,
                        error = "Utilisateur non trouvé"
                    });
            }
            var user = await _context.Users
                                        .FirstOrDefaultAsync(u => u.Email == email);

            if (user.NAttempt >= 3)
            {
                return Unauthorized(new 
                { 
                    status = "failed",
                    datas = (object)null,
                    error = "Vous avez atteint le nombre maximum de tentatives. Un lieu vous a été envoyé pour réinitialiser ce nombre." 
                });
            }

            if(user.Password != Hasher.HashString(loginJson.Pwd))
            {
                user.NAttempt += 1;
                CheckAttempt(user.NAttempt, user.Email);
                _context.Entry(user).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
                return BadRequest(new
                    {
                        status = "failed",
                        datas = (object)null,
                        error = "Mot de passe incorrect. Il vous reste : "+(3 - user.NAttempt)+" tentative(s)."
                    });
                }

                var pin = Generator.GenererPin(6);
                var pinHtml = EmailService.GetPinHtml(pin);

                EmailService.SendEmail(user.Email,"Confirmation Authentification",pinHtml);

                UserCacheInfo userCache = new UserCacheInfo(user,pin);

                _multiAuthCache.AddUserToCache(userCache);

                return Ok(new
                    {
                        status = "success",
                        datas = "1. Connexion Réussie",
                        error = (object)null
                    });
        }

        [HttpPost("/confirmLogin")]
        public async Task<IActionResult> ValidateLogin(PinSent pinSent)
        {
            var userCache = _multiAuthCache.GetUserCacheInfo(pinSent.Email);

            if(userCache==null){
                return BadRequest(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "Pin expiré ou email non-inscrit"
                });
            }

            if (userCache.User.NAttempt >= 3)
            {
                return Unauthorized(new 
                { 
                    status = "failed",
                    datas = (object)null,
                    error = "Vous avez atteint le nombre maximum de tentatives. Un lien vous a été envoyé pour réinitialiser ce nombre." 
                });
            }

            if(!_multiAuthCache.ValidatePin(pinSent.Email, pinSent.Pin)){
                
                var userDiso = userCache.User;
                userDiso.NAttempt +=1;
                CheckAttempt(userDiso.NAttempt, pinSent.Email);
                _context.Entry(userDiso).State = EntityState.Modified;
                try
                {
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    throw;
                }
                return BadRequest(new
                    {
                        status = "failed",
                        datas = (object)null,
                        error = "Pin incorrect. Il vous reste : "+(3 - userDiso.NAttempt)+" tentative(s)."
                    });
                
            }
            var userMarina = userCache.User;
            userMarina.NAttempt = 0;
            _context.Entry(userMarina).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            // generer le token
            var tokenValue = Generator.GenererToken();
            Token tokenObj = new Token();
            tokenObj.Value = tokenValue;
            tokenObj.CreatedAt = DateTime.Now;
            tokenObj.ExpiresAt =  DateTime.Now.AddSeconds(pinSent.ExpiresTokenSeconds);
            tokenObj.User = userMarina;

            _context.Tokens.Add(tokenObj);
            await _context.SaveChangesAsync();
            _multiAuthCache.RemoveUserFromCache(userMarina.Email);
            return Ok(new
            {
                status = "success",
                datas = new {
                    message = "2. Connexion réussie",
                    token = tokenValue
                },
                error = (object)null
            });
        }

        [HttpGet("reset-attempts")]
        public async Task<IActionResult> ResetAttempts([FromQuery] string email)
        {
            try
            {
                var decodedBytes = Convert.FromBase64String(email);
                var decodedEmail = Encoding.UTF8.GetString(decodedBytes);

                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == decodedEmail);
                if (user == null)
                {
                    return NotFound(new
                    {
                        status = "failed",
                        datas = (object)null,
                        error = "Utilisateur non trouvé."
                    });
                }

                // Réinitialise le nombre de tentatives
                user.NAttempt = 0;
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    status = "success",
                    datas = "Nombre de tentatives réinitialiées",
                    error = (object) null
                });
            }
            catch (FormatException)
            {
                return BadRequest(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "Format d'email invalide"
                });                
            }
        }

        // PUT: api/Users/update
        [HttpPost("/update")]
        public async Task<IActionResult> UpdateUser(User userModified)
        {
            var user = await _context.Users
                                    .FirstOrDefaultAsync(u => u.Email == userModified.Email);
            if (user == null)
            {
                return NotFound(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "Utilisateur non trouvé."
                });
            }

            user.FullName = userModified.FullName;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                status = "success",
                datas = "Nouvelles informations sauvegardées",
                error = (object)null
            });
        }

        [HttpPost("/reinitialise")]
        public async Task<IActionResult> ReinitialisePwd(string email,string link)
        {
            if (!_context.Users.Any(u => u.Email == email))
            {
                return BadRequest(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "L'email est introuvable."
                });
            }


            var user = await _context.Users
                                     .FirstOrDefaultAsync(u => u.Email == email);

            var resetHtml = EmailService.GetResetPwdHtml(link);

            EmailService.SendEmail(user.Email,"Confirmation réinitialisation",resetHtml);

           return Ok(new
            {
                status = "success",
                datas = "Email de réinitialisation envoyé",
                error = (object) null
            });
        }

        [HttpPost("/validateReinitialise")]
        public async Task<IActionResult> ValidatePwd(string email,string mdp)
        {
            if (!_context.Users.Any(u => u.Email == email))
            {
                return BadRequest(new
                {
                    status = "failed",
                    datas = (object)null,
                    error = "L'email est introuvable."
                });
            }


            var user = await _context.Users
                                     .FirstOrDefaultAsync(u => u.Email == email);

           // hashage de pwd
            var pwdhached = Hasher.HashString(mdp);
            user.Password = pwdhached;
            await _context.SaveChangesAsync();

           return Ok(new
            {
                status = "success",
                datas = "Mot de passe réinitialisé.",
                error = (object) null
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
                datas = "Utilisateur supprimé",
                error = (object)null
            });
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        private void CheckAttempt(int? NAttempt, string email)
        {
            if (NAttempt >= 3){
                var encodedEmail = Convert.ToBase64String(Encoding.UTF8.GetBytes(email));
                var resetlink =  $"{Request.Scheme}://{Request.Host}/api/Users/reset-attempts?email={encodedEmail}";
                var resetHtml = EmailService.GetResetAttemptHtml(resetlink);
                EmailService.SendEmail(email, "Réinitialisation Nombre Tentatives de Connexion", resetHtml);
            }
        }
    }
}
