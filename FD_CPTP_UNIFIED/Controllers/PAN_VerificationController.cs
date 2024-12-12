using System;
using System.Threading.Tasks;
using Extension;
using FD_CPTP_UNIFIED;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using FD_OFFLINE_CKYC_UPDATE.App_Code.Services;
using FD_OFFLINE_CKYC_UPDATE.BussinessObject;
using FD_UNIFIED_CPTP.Services;
using MF_FD_ESARATHI_APP.Models;
using MF_FD_ESARATHI_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace FD_OFFLINE_CKYC_UPDATE.Controllers
{

    public class PAN_VerificationController : Controller
    {
        [HttpPost]
        public async Task<IActionResult> Index([FromBody] PANReqBO reqBO)
        {
            try
            {
                PAN_Verification verification = new PAN_Verification();
                SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
                session.FormCode = Convert.ToString(HttpContext.Session.GetString("SubModeCode"));//objSessionBo.FormCode;

                string results = JsonConvert.SerializeObject(reqBO);
                PANResBO objPanResponseBO = new PANResBO();
                objPanResponseBO = verification.Verify_PAN(reqBO, session);
                return Ok(objPanResponseBO);
            }
            catch (Exception ex)
            {
                Task.Run(() => ExceptionUtility.LogExceptionAsync(Startup.Configuration, ex));
                return NoContent();
            }

        }
    }
}