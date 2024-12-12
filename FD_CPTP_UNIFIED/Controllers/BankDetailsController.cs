using System.Data;
using FD_CPTP_UNIFIED.DAL;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
    
    public class BankDetailsController : Controller
    {
        private readonly BankDetailsDAL objDal;
        public BankDetailsController()
        {
            objDal = new BankDetailsDAL(Startup.Configuration);
        }

        [HttpGet, Route("BankDetails/Get_BankDtls/{SearchTxt}")]
        public IActionResult Get_BankDtls(string SearchTxt)
        {
            using (DataTable dt = objDal.Get_BankDtls(SearchTxt))
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