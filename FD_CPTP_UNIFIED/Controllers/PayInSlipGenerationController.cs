using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
 
    public class PayInSlipGenerationController : Controller
    {

        [Route("PayInSlipGeneration")]
        public IActionResult Index()
        {
            return View();
        }
    }
}