using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
   
    public class NomineeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}