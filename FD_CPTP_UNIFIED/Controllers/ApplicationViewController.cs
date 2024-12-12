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
    public class ApplicationViewController : Controller
    {
        public IActionResult Index()
        {
            var SubModeCode = "ViewApplication";
            Task.Run(() => MenuLog.SaveMenuLog(Startup.Configuration, HttpContext, SubModeCode));
            return View();

        }

        [HttpGet("GET_APPLS_FOR_VIEWAsync")]
        public async Task<IActionResult> GET_APPLS_FOR_VIEWAsync()
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            ApplicationViewDAL objDal = new ApplicationViewDAL(Startup.Configuration);

            using (DataTable dt = await objDal.GET_APPLS_FOR_VIEWAsync(session))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }
        }


        [HttpGet("GET_APPL_DTLS_FOR_VIEWAsync/{Appl_No}")]
        public async Task<IActionResult> GET_APPL_DTLS_FOR_VIEWAsync(string Appl_No)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            ApplicationViewDAL objDal = new ApplicationViewDAL(Startup.Configuration);

            using (DataSet ds = await objDal.GET_APPL_DTLS_FOR_VIEWAsync(Appl_No, session))
            {
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0] != null && ds.Tables[0].Rows.Count > 0)
                {
                    return Ok(ds);
                }

                return NoContent();

            }
        }
    }
}
