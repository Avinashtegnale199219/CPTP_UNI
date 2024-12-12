using Extension;
using FD_CPTP_UNIFIED;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Net.Http;
using System.Threading.Tasks;

namespace FD_CPTP_BackOffice.Controllers
{
    [Route("[controller]")]
    public class GenerateShortURLController : Controller
    {
        private readonly GenerateShortURLDAL objDAL;
        public GenerateShortURLController()
        {
            objDAL = new GenerateShortURLDAL(Startup.Configuration);

        }

        public IActionResult Index(int TabIndex = 1)
        {
            ViewBag.TabIndex = TabIndex;

            return View();
        }

        [HttpGet("GetApplicationForShortURL")]
        public IActionResult GetApplicationForShortURL()
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            string strResult = string.Empty;
            DataTable dt = objDAL.GetApplicationForShortURL(session);
            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }
            return NoContent();
        }

        [HttpGet("GetInvestmentDeclarationStatus")]
        public IActionResult GetInvestmentDeclarationStatus()
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            DataTable dt = objDAL.GetInvestmentDeclarationStatus(session);
            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }
            return NoContent();
        }


        [HttpGet, Route("GenerateShortURL/ShortURL/{ApplNo}")]
        public async Task<IActionResult> ShortURL(string ApplNo)
        {
            string URL_Msg = "Something went wrong while generating short URL.";
            int URL_Status = 0;

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            //GenerateShortURLDAL objDAL = new GenerateShortURLDAL();
            GenerateShortURLBO paymentRequestDtl = new GenerateShortURLBO();

            DataTable dtLoginDetails = objDAL.Get_CP_ShortURL_Login_Dtl(session.Agency_Clustered_ID);

            if (dtLoginDetails != null && dtLoginDetails.Rows.Count > 0)
            {
                paymentRequestDtl.PGW_UserName = dtLoginDetails.Rows[0]["Username"].ToString();
                paymentRequestDtl.PGW_Password = dtLoginDetails.Rows[0]["Password"].ToString();
            }


            paymentRequestDtl.Appl_No = ApplNo;
            paymentRequestDtl.Portal_Code = session.Source;

            string result = await PaymentRequestAsync(paymentRequestDtl);

            if (result != null && result.ToUpper().Contains("SUCCESS"))
            {

                URL_Msg = "Application Number " + ApplNo + " Short URL Generated Successfully.";
                URL_Status = 1;
            }
            else
            {
                URL_Msg += " Error:";
                URL_Msg += result;
                URL_Status = 0;
            }


            return Ok(new { Status = 1, Msg = URL_Msg, URL_Status });
            //return Ok(new { result = URL_Msg, status = URL_Status });

        }

        [HttpGet, Route("GenerateShortURL/InvestmentDeclaration/{ApplNo}")]
        public async Task<IActionResult> InvestmentDeclaration(string ApplNo)
        {
            string URL_Msg = "Something went wrong while generating short URL.";
            int URL_Status = 0;
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            //GenerateShortURLDAL objDAL = new GenerateShortURLDAL();
            GenerateShortURLBO objBO = new GenerateShortURLBO();

            DataTable dtLoginDetails = objDAL.Get_CP_ShortURL_Login_Dtl(session.Agency_Clustered_ID);

            if (dtLoginDetails != null && dtLoginDetails.Rows.Count > 0)
            {
                objBO.PGW_UserName = dtLoginDetails.Rows[0]["Username"].ToString();
                objBO.PGW_Password = dtLoginDetails.Rows[0]["Password"].ToString();
            }


            objBO.Appl_No = ApplNo;
            objBO.Portal_Code = session.Source;
            objBO.Source = session.Source;

            string result = await InvestmentDeclarationRequestAsync(objBO);

            if (result != null && result.ToUpper().Contains("SUCCESS"))
            {

                URL_Msg = "Application Number " + ApplNo + " Short URL Generated Successfully.";
                URL_Status = 1;
            }
            else
            {
                URL_Msg += " Error: ";
                URL_Msg += result;
                URL_Status = 0;
            }



            return Ok(new { Status = 1, Msg = URL_Msg, URL_Status });

        }

        private async Task<string> PaymentRequestAsync(GenerateShortURLBO paymentRequestDtl)
        {
            try
            {
                string paymentURL = Startup.Configuration["PGW:GenerateShortURL"].ToString();
                HttpClient client = new HttpClient();
                HttpResponseMessage message = await client.PostAsJsonAsync(paymentURL, paymentRequestDtl);
                // message.EnsureSuccessStatusCode();
                if (message.IsSuccessStatusCode)
                {
                    string result = await message.Content.ReadAsStringAsync();
                    return result;
                }

                return message.StatusCode.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
                //return null;
            }
        }

        private async Task<string> InvestmentDeclarationRequestAsync(GenerateShortURLBO objBO)
        {
            try
            {
                string InvestmentDeclarationURL = Startup.Configuration["PGW:InvestmentDeclarationShortURL"].ToString();
                HttpClient client = new HttpClient();
                HttpResponseMessage message = await client.PostAsJsonAsync(InvestmentDeclarationURL, objBO);
                // message.EnsureSuccessStatusCode();
                if (message.IsSuccessStatusCode)
                {
                    string result = await message.Content.ReadAsStringAsync();
                    return result;
                }

                return message.StatusCode.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
                //return null;
            }
        }

    }
}