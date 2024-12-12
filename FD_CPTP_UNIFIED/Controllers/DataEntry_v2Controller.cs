using Microsoft.AspNetCore.Mvc;
using FD_CPTP_UNIFIED.DAL;
using FD_CPTP_UNIFIED;

namespace FD_CPTP_BackOffice.v2.Controllers
{
    [Produces("Application/json")]
    public class DataEntry_v2Controller : Controller
    {
        DataEntryDAL_v2 objDal;

        public DataEntry_v2Controller()
        {
            objDal = new DataEntryDAL_v2(Startup.Configuration);

        }

        //[HttpPost]
        //public async Task<IActionResult> ViewDocumentLogAsync([FromBody]DocumentLog documentLog)
        //{
        //    try
        //    {
        //        SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
        //        session.FormCode = Convert.ToString(HttpContext.Session.GetString("SubModeCode"));//objSessionBo.FormCode;

        //        bool res = false;
        //        res = await objDal.ViewDocumentLogAsync(documentLog, session);
        //        return Ok(res);
        //    }
        //    catch (Exception)
        //    {
        //        return NoContent();
        //    }

        //}


        //[HttpGet]
        //public async Task<IActionResult> GetPaymentOptionAsync()
        //{
        //    SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

        //    using (DataTable dt = await objDal.GetPaymentOptionAsync(session))
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }

        //}

        //[HttpGet]
        //public async Task<IActionResult> Get_FDR_Dispatch_ModeAsync()
        //{


        //    using (DataTable dt = await objDal.Get_FDR_Dispatch_ModeAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }

        //}


        //[HttpGet]
        //public async Task<IActionResult> Get_Depositor_StatusAsync()
        //{


        //    using (DataTable dt = await objDal.Get_Depositor_StatusAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }

        //}


        //[HttpGet]
        //public async Task<IActionResult> Get_HNGAsync()
        //{


        //    using (DataTable dt = await objDal.Get_HNGAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }
        //        return NoContent();

        //    }

        //}

        //[HttpGet]
        //public async Task<IActionResult> Get_Annual_IncomeAsync()
        //{

        //    using (DataTable dt = await objDal.Get_Annual_IncomeAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }
        //}

        //[HttpGet]
        //public async Task<IActionResult> Get_Investor_Nominee_RelationAsync()
        //{


        //    using (DataTable dt = await dataEntry.Get_Investor_Nominee_RelationAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }

        //}

        //[HttpGet]
        //public async Task<IActionResult> Get_ddl_StateAsync()
        //{
        //    string res = string.Empty;

        //    using (DataTable dt = await objDal.Get_StateAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }
        //}

        //[HttpGet]
        //public async Task<IActionResult> Get_Salutation_MstAsync()
        //{


        //    using (DataTable dt = await objDal.Get_Salutation_MstAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }

        //}

        //[HttpGet]
        //public async Task<IActionResult> Get_Marital_StatusAsync()
        //{


        //    using (DataTable dt = await objDal.Get_Marital_StatusAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }

        //}

        //[HttpGet]
        //public async Task<IActionResult> Get_Gender_StatusAsync()
        //{


        //    using (DataTable dt = await objDal.Get_Gender_StatusAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }

        //}

        //[HttpGet]
        //public async Task<IActionResult> Get_DepositPayableAsync()
        //{


        //    using (DataTable dt = await objDal.Get_DepositPayableAsync())
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }
        //}



        //[HttpGet, Route("DataEntry_v2/Get_ddl_DistrictAsync/{StateCode}")]
        //public async Task<IActionResult> Get_ddl_DistrictAsync(string StateCode)
        //{

        //    using (DataTable dt = await objDal.GetDistrictAsync(StateCode))
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }

        //        return NoContent();

        //    }
        //}



       

        //[HttpPost]
        //public IActionResult Insert_WorkOrder([FromBody]HeaderDetails headerDetails)
        //{

        //    SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
        //    session.FormCode = Convert.ToString(HttpContext.Session.GetString("SubModeCode"));

        //    using (DataTable dt = objDal.Insert_WorkOrder(headerDetails, session))
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt.ToDynamic());
        //        }
        //    }
        //    return NoContent();
        //}
    }
}