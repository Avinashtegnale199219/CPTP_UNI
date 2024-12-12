using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using FD_CPTP_UNIFIED;
using System.Data;
using System.Text;
using System;
using Extension;
using MF_FD_ESARATHI_APP.Models;
using FD_UNIFIED_CPTP.Services;
using System.Threading.Tasks;

namespace FD_CPTP_BackOffice.Controllers
{

    public class InvestorDetailsSaveController : Controller
    {
        private readonly InvestorDetailsSaveDAL objDal;
        public InvestorDetailsSaveController()
        {
            objDal = new InvestorDetailsSaveDAL(Startup.Configuration);
        }

        public IActionResult SubmitStep1([FromBody] FrontOfficeSaveBO saveBO)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Status = 0 });
            }

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");



            using (DataTable dt = objDal.Insert_Front_Office_Dtls(saveBO, session))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

            }
            return NoContent();
        }

        public IActionResult SubmitStep1Copy([FromBody] FrontOfficeSaveBO saveBO)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Status = 0 });
            }

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            using (DataTable dt = objDal.COPY_Front_Office_Dtls(saveBO, session))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

            }
            return NoContent();
        }

        [Produces("application/json")]
        public IActionResult SubmitStep2([FromBody] Investor_Other_DtlBO saveBO)
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
        public IActionResult SubmitStep3([FromBody] Investment_DtlBO saveBO)
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
        public IActionResult SubmitStep4([FromBody] Investor_Bank_DtlBO saveBO)
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
        public async Task<IActionResult> SubmitStep5([FromBody] InvestorDetailSaveStruct saveBO)
        {
            if (!ModelState.IsValid)
            {
                return Ok(new { Status = 0 });
            }

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            InvestorDetailsSaveBAL investorDetailsSaveBAL = new InvestorDetailsSaveBAL(Startup.Configuration);


            if (!string.IsNullOrEmpty(saveBO.KYCDataDetails[0].Data_Source) && (saveBO.KYCDataDetails[0].Data_Source.ToUpper() == "FRESH" || saveBO.KYCDataDetails[0].Data_Source.ToUpper() == "CKYC"))
            {
                #region NameScreeing and Risk Category API Call
                NAS_RiskCategory NAS_RC = new NAS_RiskCategory(Startup.Configuration);
                string NSA_Res_Status = await NAS_RC.Get_NSA(session, saveBO.KYCDataDetails, saveBO.Investment_Dtl, saveBO.KYCDataDetails[0].Appl_No);

                if (NSA_Res_Status.ToUpper().Contains("FAILED"))
                {
                    return Ok(new { Status = 0, Msg = "As per compliance requirement, we request you to kindly visit our nearest branch to complete your investment.", data = "", NSA_Res_Status });
                }
                else if (NSA_Res_Status.ToUpper().Contains("FAIL"))
                {
                    return Ok(new { Status = 0, Msg = "Please try again later or contact our nearest branch.", data = "", NSA_Res_Status });
                }
                #endregion
            }

            if (investorDetailsSaveBAL.InvestorKYCSave(saveBO, session))
            {
                return Ok(new { Status = 1, Msg = "Data saved successfully", NSA_Res_Status = string.Empty });
            }
            return Ok(new { Status = 0 });
        }

        [Produces("application/json")]
        public IActionResult SubmitStep6([FromBody] Nominee_Dtl saveBO)
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

        //[Produces("application/json")]
        //public IActionResult SubmitStep7([FromBody]List<OVDBO> saveBO)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return Ok(new { Status = 0 });
        //    }

        //    SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

        //    if (objDal.Insert_OVD(saveBO, session))
        //    {
        //        return Ok(new { Status = 1, Msg = "Data saved successfully" });
        //    }

        //    return Ok(new { Status = 0 });
        //}

        [Produces("application/json")]
        public IActionResult SubmitStep7([FromBody] InvestorDetailSaveStruct investorDetailSaveStruct)
        {

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            InvestorDetailsSaveBAL investorDetailsSaveBAL = new InvestorDetailsSaveBAL(Startup.Configuration);

            if (investorDetailsSaveBAL.InvestorOVDSave(investorDetailSaveStruct, session))
            {
                return Ok(new { Status = 1, Msg = "Data saved successfully" });
            }

            return Ok(new { Status = 0 });
        }


        [Produces("application/json")]
        public IActionResult SubmitStep8([FromBody] InvestorDetailSaveStruct saveBO)
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
                return Ok(new { Status = 0, Msg = sb.ToString() });
            }

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            InvestorDetailsSaveBAL investorDetailsSaveBAL = new InvestorDetailsSaveBAL(Startup.Configuration);


            //if (investorDetailsSaveBAL.InvestorSingleSave(saveBO, session))
            //{
            //    if (saveBO.FrontOfficeSave.ApplicationDeclarationType == "DIGITAL" || saveBO.FrontOfficeSave.ModeOfPayment == "1" || saveBO.FrontOfficeSave.ModeOfPayment == "2" || saveBO.FrontOfficeSave.ModeOfPayment == "Online" || saveBO.FrontOfficeSave.ModeOfPayment == "RTGS/NEFT" || saveBO.FrontOfficeSave.ModeOfPayment == "RTGS / NEFT")
            //    {
            //        if (saveBO.FrontOfficeSave.ModeOfPayment == "Online" || saveBO.FrontOfficeSave.ModeOfPayment == "1")
            //        {
            //            return RedirectToAction("ShortURL", "GenerateShortURL", new { ApplNo = saveBO.FrontOfficeSave.Appl_No });
            //        }
            //        else
            //        {
            //            return RedirectToAction("InvestmentDeclaration", "GenerateShortURL", new { ApplNo = saveBO.FrontOfficeSave.Appl_No });

            //        }
            //    }

            //    return Ok(new { Status = 1, Msg = "Data saved successfully" });
            //}


            if (investorDetailsSaveBAL.InvestorSingleSave(saveBO, session))
            {
                if (saveBO.FrontOfficeSave.ApplicationDeclarationType == "DIGITAL" || saveBO.FrontOfficeSave.ModeOfPayment == "1" || saveBO.FrontOfficeSave.ModeOfPayment == "2" || saveBO.FrontOfficeSave.ModeOfPayment == "Online" || saveBO.FrontOfficeSave.ModeOfPayment == "RTGS/NEFT" || saveBO.FrontOfficeSave.ModeOfPayment == "RTGS / NEFT")
                {
                    return RedirectToAction("ShortURL", "GenerateShortURL", new { ApplNo = saveBO.FrontOfficeSave.Appl_No });
                }
                return Ok(new { Status = 1, Msg = "Data saved successfully" });
            }

            return Ok(new { Status = 0 });
        }
    }
}