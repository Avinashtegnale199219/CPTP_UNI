using System.Data;
using System.Threading.Tasks;
using Extension;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
  
    public class FDConfigurationController : Controller
    {
        private readonly FDConfigurationDAL objDal;
        public FDConfigurationController()
        {
            objDal = new FDConfigurationDAL(Startup.Configuration);
        }

        [HttpGet]
        public async Task<IActionResult> Get_Depositor_StatusAsync()
        {

            using (DataTable dt = await objDal.Get_Depositor_StatusAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        [HttpGet]
        public async Task<IActionResult> GetPaymentOptionAsync()
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            using (DataTable dt = await objDal.GetPaymentOptionAsync(session))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        [HttpGet]
        public async Task<IActionResult> Get_FDR_Dispatch_ModeAsync()
        {


            using (DataTable dt = await objDal.Get_FDR_Dispatch_ModeAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        [HttpPost]
        public async Task<IActionResult> Get_CategoryAsync([FromBody]DepositDtlBO depositDetails)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            using (DataSet dataSet = await objDal.GetDepositDtlsAsync(null, null, null, null, depositDetails.Mode_Status, "S", depositDetails.Amount, session.Source))
            {
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[2].Rows.Count > 0)
                {
                    return Ok(dataSet.Tables[2]);
                }

                return NoContent();

            }

        }

        [HttpPost]
        public async Task<IActionResult> Get_FD_SchemeAsync([FromBody]DepositDtlBO depositDetails)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            using (DataSet dataSet = await objDal.GetDepositDtlsAsync(null, null, null, depositDetails.CATEGORY, depositDetails.Mode_Status, "S", depositDetails.Amount, session.Source))
            {
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                {
                    return Ok(dataSet.Tables[0]);
                }

                return NoContent();

            }
        }

        [HttpPost]
        public async Task<IActionResult> GetInterestFrequencyAsync([FromBody]DepositDtlBO depositDetails)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            using (DataSet dataSet = await objDal.GetDepositDtlsAsync(depositDetails.SCHEME, null, null, depositDetails.CATEGORY, depositDetails.Mode_Status, "S", depositDetails.Amount, session.Source))
            {
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[3].Rows.Count > 0)
                {
                    return Ok(dataSet.Tables[3]);
                }

                return NoContent();

            }
        }

        [HttpPost]
        public async Task<IActionResult> GetTenureAsync([FromBody]DepositDtlBO depositDetails)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            using (DataSet dataSet = await objDal.GetDepositDtlsAsync(depositDetails.SCHEME, null, depositDetails.INTEREST_FREQ, depositDetails.CATEGORY, depositDetails.Mode_Status, "S", depositDetails.Amount, session.Source))
            {
                if (dataSet != null && dataSet.Tables.Count > 0 && dataSet.Tables[1].Rows.Count > 0)
                {
                    return Ok(dataSet.Tables[1]);
                }
                return NoContent();
            }
        }

        [HttpGet, Produces("application/json")]
        public IActionResult ValidateAmount(int amount)
        {
            return Ok(objDal.ValidateAmount(amount));
        }

        [HttpPost]
        public IActionResult ValidateFDAmount([FromBody]DepositDtlBO depositDetails)
        {
            return Ok(objDal.ValidateFDAmount(depositDetails));

        }
    }
}