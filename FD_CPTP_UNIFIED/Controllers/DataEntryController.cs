using System;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using System.Threading.Tasks;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using Extension;
using MF_FD_ESARATHI_APP.Services;
using MF_FD_ESARATHI_APP.Models;

namespace FD_CPTP_UNIFIED.Controllers
{

    [Produces("Application/json")]
    public class DataEntryController : Controller
    {
        private IHostingEnvironment _env;
        public DataEntryController(IHostingEnvironment env)
        {
            _env = env;
        }


        public IActionResult Index(int PaymentMode = 1)
        {
            ViewBag.PaymentMode = PaymentMode;
            var SubModeCode = "AddApplication";
            Task.Run(() => MenuLog.SaveMenuLog(Startup.Configuration, HttpContext, SubModeCode));
            return View();
        }

        /// <summary>
        /// Log Document view click
        /// </summary>
        /// <param name="documentLog"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> ViewDocumentLogAsync([FromBody]DocumentLog documentLog)
        {
            try
            {
                SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

                DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);
                bool res = false;
                res = await objDal.ViewDocumentLogAsync(documentLog, session);
                return Ok(res);
            }
            catch (Exception)
            {
                return NoContent();
            }

        }


        /// <summary>
        /// Get Payment options master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetPaymentOptionAsync()
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.GetPaymentOptionAsync(session))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        /// <summary>
        /// Get FDR dispatch mode master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_FDR_Dispatch_ModeAsync()
        {

            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_FDR_Dispatch_ModeAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        /// <summary>
        /// Get depositor status master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Depositor_StatusAsync()
        {

            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_Depositor_StatusAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        /// <summary>
        /// Get H&G master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_HNGAsync()
        {

            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_HNGAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }
                return NoContent();

            }

        }

        /// <summary>
        /// Get annual income master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Annual_IncomeAsync()
        {
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_Annual_IncomeAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }
        }

        /// <summary>
        /// Get nominee relationship master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Investor_Nominee_RelationAsync()
        {

            DataEntryDAL dataEntry = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await dataEntry.Get_Investor_Nominee_RelationAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        /// <summary>
        /// Get state master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_ddl_StateAsync()
        {
            string res = string.Empty;
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_StateAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }
        }

        /// <summary>
        /// Get title master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Salutation_MstAsync()
        {

            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_Salutation_MstAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        /// <summary>
        /// Get marital status master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Marital_StatusAsync()
        {

            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_Marital_StatusAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        /// <summary>
        /// Get gender master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_Gender_StatusAsync()
        {

            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_Gender_StatusAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        /// <summary>
        /// Get deposite payable to master
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get_DepositPayableAsync()
        {

            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_DepositPayableAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }
        }

        /// <summary>
        /// Get Folio search master
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> Get_Folio_Search_Type_MstAsync()
        {
            DataEntryDAL dataEntry = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await dataEntry.Get_Folio_Search_Type_MstAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }
                return NoContent();
            }
        }

        /// <summary>
        /// Get distict master
        /// </summary>
        /// <param name="StateCode"></param>
        /// <returns></returns>
        [HttpGet, Route("DataEntry/Get_ddl_DistrictAsync/{StateCode}")]
        public async Task<IActionResult> Get_ddl_DistrictAsync(string StateCode)
        {
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.GetDistrictAsync(StateCode))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }
        }

        /// <summary>
        /// Get pinecode based on distict 
        /// </summary>
        /// <param name="DistrictDesc"></param>
        /// <returns></returns>
        [HttpGet, Route("DataEntry/GetPinCodeAsync/{DistrictDesc}")]
        public async Task<IActionResult> GetPinCodeAsync(string DistrictDesc)
        {
            DataEntryDAL dataEntry = new DataEntryDAL(Startup.Configuration);
            using (DataTable dt = await dataEntry.GetPinCodeAsync(DistrictDesc))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }
                return NoContent();
            }
        }

        /// <summary>
        /// Get all application details
        /// </summary>
        /// <param name="Appl_No"></param>
        /// <returns></returns>
        [HttpGet, Route("DataEntry/GET_APPL_DTLS/{Appl_No}")]
        public async Task<IActionResult> GET_APPL_DTLS(string Appl_No)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataSet ds = await objDal.GET_APPL_DTLS(Appl_No, session))
            {
                if (ds != null && ds.Tables.Count > 0)
                {
                    return Ok(ds);
                }

                return NoContent();

            }
        }

        /// <summary>
        /// Search pincode
        /// </summary>
        /// <param name="Pincode"></param>
        /// <returns></returns>
        [HttpGet("DataEntry/SearchPincode/{Pincode}")]
        public IActionResult SearchPincode(string Pincode)
        {
            DataEntryDAL dataEntry = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = dataEntry.SearchPincode(Pincode))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }
                return NoContent();
            }
        }

        /// <summary>
        /// Check PAN exists or not in case of additional purchase
        /// </summary>
        /// <param name="investorDtl"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult CheckExistingPan([FromBody]SearchApplicationBO investorDtl)
        {
            DataEntryDAL dataEntry = new DataEntryDAL(Startup.Configuration);
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            string Msg = dataEntry.CheckExistingPan(investorDtl, session);
            if (!string.IsNullOrEmpty(Msg))
            {
                return Ok(Msg);
            }
            else
            {
                return Ok("Something Went Wrong");
            }
        }

        /// <summary>
        /// Check PAN
        /// </summary>
        /// <param name="investorDtl"></param>
        /// <returns></returns>
        [HttpPost("DataEntry/Check_PAN")]
        public async Task<IActionResult> Check_PAN([FromBody]SearchApplicationBO investorDtl)
        {
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            DataTable dt = await objDal.Check_PANAsync(investorDtl, session);
            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }
            return NoContent();
        }

        [HttpGet("DataEntry/GetBrokerDtlAsync/{SearchText}")]
        public async Task<IActionResult> GetBrokerDtlAsync(string SearchText)
        {
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);
            DataTable dt = await objDal.GetBrokerDtlAsync(SearchText);

            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }
            return NoContent();

        }

        [HttpGet("DataEntry/Is_Valid_Emp_Or_Broker_CodeAsync/{code}")]
        public async Task<IActionResult> Is_Valid_Emp_Or_Broker_CodeAsync(string code)
        {
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);
            DataTable dt = await objDal.Is_Valid_Emp_Or_Broker_CodeAsync(code);

            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }
            return NoContent();

        }

        //avinash added Occupation/sub-occupation changes
        [HttpGet]
        public async Task<IActionResult> Get_ddl_Occ_CustomerSegType()
        {
            string res = string.Empty;
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_ddl_Occ_CustomerSegType())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Get_ddl_Occ_CustSegSubTypeList([FromBody] string CustSegType_Code)
        {
            string res = string.Empty;
            DataEntryDAL objDal = new DataEntryDAL(Startup.Configuration);

            using (DataTable dt = await objDal.Get_ddl_Occ_CustSegSubTypeList(CustSegType_Code))
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