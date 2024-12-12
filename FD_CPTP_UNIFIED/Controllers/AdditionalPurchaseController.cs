using System.Data;
using System.Threading.Tasks;
using Extension;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{

    public class AdditionalPurchaseController : Controller
    {
        private readonly AdditionalPurchaseDAL objDAL;

        public AdditionalPurchaseController()
        {
            objDAL = new AdditionalPurchaseDAL(Startup.Configuration);
        }


        public async Task<IActionResult> Get_Folio_Search_Type_MstAsync()
        {

            using (DataTable dt = await objDAL.Get_Folio_Search_Type_MstAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }
                return NoContent();
            }
        }

        [HttpPost]
        public async Task<IActionResult> SearchExistingCustomer([FromBody]SearchApplicationBO SearchBo)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            DataTable dt = await objDAL.SearchExistingCustomerAsync(SearchBo, session);
            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }
            return NoContent();
        }
    }
}