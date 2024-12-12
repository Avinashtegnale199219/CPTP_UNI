using System.Threading.Tasks;
using Extension;
using MF_FD_ESARATHI_APP.Models;
using MF_FD_ESARATHI_APP.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
    [AllowAnonymous]
   
    public class ErrorController : Controller
    {
        public IActionResult Index()
        {
           
                return View();
           
        }

        public IActionResult Authorization()
        {
            return View();
        }

        public IActionResult Expired()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> ExceptionLog(string ErrorMsg)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            await ExceptionUtility.ClientSideErrorLog(ErrorMsg, session);
            ExceptionUtility ext = ExceptionUtility.SetValue(HttpContext,ErrorMsg);
            return Ok();
        }
    }
}
