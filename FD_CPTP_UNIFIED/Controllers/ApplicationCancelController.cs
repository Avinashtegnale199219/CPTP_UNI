using System.Data;
using System.Threading.Tasks;
using Extension;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using MF_FD_ESARATHI_APP.Models;
using MF_FD_ESARATHI_APP.Services;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
    [Route("[controller]")]
    public class ApplicationCancelController : Controller
    {
        public IActionResult Index()
        {
            var SubModeCode = "CancelApplication";
            Task.Run(() => MenuLog.SaveMenuLog(Startup.Configuration, HttpContext, SubModeCode));
            return View();
        }


        [HttpGet("CANCEL_APPLICATION/{Appl_No}")]
        public IActionResult CANCEL_APPLICATION(string Appl_No)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            ApplicationCancelDAL objDal = new ApplicationCancelDAL(Startup.Configuration);

            using (DataTable dt = objDal.CANCEL_APPLICATION(Appl_No, session))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }
        }

    }
}
