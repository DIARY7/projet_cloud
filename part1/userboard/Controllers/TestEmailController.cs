using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using userboard.Models;
using userboard.Data;
using userboard.Utils;


namespace userboard.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestEmailController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TestEmailController(AppDbContext context){
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            var email = EmailService.GetPinHtml("123456");

            EmailService.SendEmail("nyxrafaly@gmail.com","test", email);
            return Ok(new{
                status = "success",
                datas = "mety",
                error = "null"
            });
        }
    }
}