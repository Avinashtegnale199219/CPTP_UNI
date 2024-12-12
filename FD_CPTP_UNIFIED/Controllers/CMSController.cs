using System.Data;
using Extension;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
    [Route("[controller]")]
    public class CMSController : Controller
    {
        private readonly CMS_DAL objDal;
        public CMSController()
        {
            objDal = new CMS_DAL(Startup.Configuration);
        }
        [HttpGet("GET_EXC_CMS_MAPPING_FLAG")]
        public IActionResult GET_EXC_CMS_MAPPING_FLAG()
        {
            SessionBO objSessionBo = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            using (DataTable dt = objDal.GET_EXC_CMS_MAPPING_FLAG(objSessionBo))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }



            }
            return NoContent();
        }

        [HttpGet("Agency_CMS_Exc_Get_State")]
        public IActionResult Agency_CMS_Exc_Get_State()
        {
            SessionBO objSessionBo = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            using (DataTable dt = objDal.Agency_CMS_Exc_Get_State(objSessionBo))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }



            }
            return NoContent();
        }

        [HttpGet("Agency_Get_Exc_mapped_CMSBank_Lnk/{Agency_State_Cd}")]
        public IActionResult Agency_Get_Exc_mapped_CMSBank_Lnk(string Agency_State_Cd)
        {
            SessionBO objSessionBo = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            using (DataTable dt = objDal.Agency_Get_Exc_mapped_CMSBank_Lnk(Agency_State_Cd))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }



            }
            return NoContent();
        }

        [HttpGet, Route("GetCMSBankDetail/{AgencyUserloccode}")]
        public IActionResult GetCMSBankDetail(string AgencyUserloccode)
        {

            using (DataTable dt = objDal.GetCMSBankDetail(AgencyUserloccode))
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