using System;
using Microsoft.AspNetCore.Mvc;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using System.Data;
using System.Text;
using Extension;
using MF_FD_ESARATHI_APP.Models;
 

namespace FD_CPTP_UNIFIED.Controllers
{
    public class RenewInvestorDetailsSaveController : Controller
    {
        private readonly RenewInvestorDetailsSaveDAL objDal;
        public RenewInvestorDetailsSaveController()
        {
            objDal = new RenewInvestorDetailsSaveDAL(Startup.Configuration);
        }

        //public IActionResult SubmitStep1([FromBody]FrontOfficeSaveBO saveBO)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return Ok(new { Status = 0 });
        //    }
        //    SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
        //    using (DataTable dt = objDal.Insert_Front_Office_Dtls(saveBO, session))
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }
        //    }
        //    return NoContent();
        //}

        public IActionResult SubmitStep1Copy([FromBody]FrontOfficeRenewSaveBO saveBO)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Status = 0 });
            }
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            using (DataTable dt = objDal.Renew_Front_Office_Dtls(saveBO, session))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }
            }
            return NoContent();
        }

        [Produces("application/json")]
        public IActionResult SubmitStep2([FromBody]Investor_Other_DtlBO saveBO)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Status = 0 });
            }

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            if (objDal.Insert_Other_Dtls(saveBO, session))
            {
                return Ok(new { Status = 1, Msg = "Data saved successfully" });
            }

            return Ok(new { Status = 0 });
        }

        [Produces("application/json")]
        public IActionResult SubmitStep3([FromBody] RenewalInvestment_DtlBO saveBO)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Status = 0 });
            }
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            if (objDal.Insert_Investment_Dtls(saveBO, session))
            {
                return Ok(new { Status = 1, Msg = "Data saved successfully" });
            }
            return Ok(new { Status = 0 });
        }

        [Produces("application/json")]
        public IActionResult SubmitStep4([FromBody]Investor_Bank_DtlBO saveBO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            if (objDal.Insert_Repayment_Bank_Dtls(saveBO, session))
            {
                return Ok(new { Status = 1, Msg = "Data saved successfully" });
            }
            return Ok(new { Status = 0 });
        }

        [Produces("application/json")]
        public IActionResult SubmitStep5([FromBody]InvestorDetailSaveStruct saveBO)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Status = 0 });
            }
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            RenewInvestorDetailsSaveBAL RenewinvestorDetailsSaveBAL = new RenewInvestorDetailsSaveBAL(Startup.Configuration);

            if (RenewinvestorDetailsSaveBAL.InvestorKYCSave(saveBO, session))
            {
                return Ok(new { Status = 1, Msg = "Data saved successfully" });
            }
            return Ok(new { Status = 0 });
        }

        [Produces("application/json")]
        public IActionResult SubmitStep6([FromBody]Nominee_Dtl saveBO)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Status = 0 });
            }
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            if (objDal.Insert_Nominee_Details(saveBO, session))
            {
                return Ok(new { Status = 1, Msg = "Data saved successfully" });
            }
            return Ok(new { Status = 0 });
        }

        [Produces("application/json")]
        public IActionResult SubmitStep7([FromBody]InvestorDetailSaveStruct investorDetailSaveStruct)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            RenewInvestorDetailsSaveBAL RenewinvestorDetailsSaveBAL = new RenewInvestorDetailsSaveBAL(Startup.Configuration);

            if (RenewinvestorDetailsSaveBAL.InvestorOVDSave(investorDetailSaveStruct, session))
            {
                return Ok(new { Status = 1, Msg = "Data saved successfully" });
            }

            return Ok(new { Status = 0 });
        }

        [Produces("application/json")]
        public IActionResult SubmitStep8([FromBody] RenewalDetailSaveStruct saveBO)
        {
            StringBuilder sb = new StringBuilder();

            if (!ModelState.IsValid)
            {
                foreach (var state in ModelState)
                {
                    foreach (var err in state.Value.Errors)
                    {
                        sb.Append(err.ErrorMessage);
                        sb.Append(Environment.NewLine);
                    }
                }
                throw new Exception(sb.ToString());
            }

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            RenewInvestorDetailsSaveBAL renewInvestorDetailsSaveBAL = new RenewInvestorDetailsSaveBAL(Startup.Configuration);
            
            if (renewInvestorDetailsSaveBAL.InvestorSingleSave(saveBO, session))
            {
                if (saveBO.FrontOfficeSave.ApplicationDeclarationType == "DIGITAL")
                {
                    return RedirectToAction("InvestmentDeclaration", "RenewalGenerateLink", new { ApplNo = saveBO.FrontOfficeSave.Appl_No });
                }
                return Ok(new { Status = 1, Msg = "Data saved successfully" });
            }

            return Ok(new { Status = 0 });
        }

    }
}