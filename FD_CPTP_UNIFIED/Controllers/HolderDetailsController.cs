using System.Data;
using System.Threading.Tasks;
using Extension;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
  
    public class HolderDetailsController : Controller
    {

        private readonly HolderDetailsDAL objDAL;

        public HolderDetailsController()
        {
            objDAL = new HolderDetailsDAL(Startup.Configuration);
        }

        [Produces("application/json")]
        public IActionResult GetBusinessBrockerCode()
        {

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            return Ok(session.Busi_Broker_Cd);
        }

        [HttpGet]
        public async Task<IActionResult> GetBranch()
        {

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            DataTable dt = await objDAL.GetBranch(session);
            if (dt == null)
            {
                return NoContent();
            }
            return Ok(dt.ToDynamic());

        }

        [HttpGet]
        public async Task<IActionResult> Get_Salutation_MstAsync()
        {


            using (DataTable dt = await objDAL.Get_Salutation_MstAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        [HttpPost]
        public async Task<IActionResult> GetProvBankDtlsAsync([FromBody]SearchApplicationBO searchApplicationBO)
        {


            using (DataTable dt = await objDAL.GetProvBankDtlsAsync(searchApplicationBO))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }



            }
            return NoContent();

        }

        [HttpPost]
        public async Task<IActionResult> GetProvNomineeDtls([FromBody]SearchApplicationBO searchApplicationBO)
        {


            using (DataTable dt = await objDAL.GetProvNomineeDtlsAsync(searchApplicationBO))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

            }
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> GetProvHolderNamesAsync([FromBody]SearchApplicationBO searchApplicationBO)
        {
            using (DataTable dt = await objDAL.GetProvHolderNamesAsync(searchApplicationBO))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> GetProvHolderDtlsAsync([FromBody]SearchApplicationBO searchApplicationBO)
        {
            using (DataTable dt = await objDAL.GetProvHolderDtlsAsync(searchApplicationBO))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }
            }
            return NoContent();
        }

    }
}