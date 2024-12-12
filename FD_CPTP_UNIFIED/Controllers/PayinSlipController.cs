using System;
using System.Collections.Generic;
using System.Data;
using BusinessObject;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Html;
using System.Web;
using System.Collections;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using Extension;
using MF_FD_ESARATHI_APP.Models;

namespace FD_CPTP_UNIFIED.Controllers
{
   
    public class PayinSlipController : Controller
    {
        [Route("PayinSlip")]
        public IActionResult Index()
        {
            return View();
        }

        private readonly PayinslipStagingDal objDal;

        public PayinSlipController()
        {
            objDal = new PayinslipStagingDal(Startup.Configuration);
        }

        public IActionResult GetBank()
        {

            // try
            //{ //string Err = "";
            DataTable dt = objDal.GetBank();
            if (dt == null)
            {
                return NoContent();
            }
            return Ok(dt.ToDynamic());
            // }
            //catch (Exception ex)
            //{
            //    //ExceptionUtility.LogExceptionAsync(ex);
            //    return StatusCode(500);
            //}
        }
        public IActionResult GetBranch()
        {
            // try
            // {
            SessionBO objSessionBo = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            string Userclusterid = objSessionBo.Agency_Usr_Clustered_ID;
            //string Userclusterid = "CAM3012";
            DataTable dt = objDal.GetBranch(Userclusterid);
            if (dt == null)
            {
                return NoContent();
            }
            return Ok(dt.ToDynamic());
            //  }
            //catch (Exception ex)
            //{
            //ExceptionUtility.LogExceptionAsync(ex);
            //return StatusCode(500);
            // }
        }

        public IActionResult GetCMSBranch(string locCode)
        {

            //try
            // { //string Err = "";
            DataTable dt = objDal.GetCMSBranch(locCode);
            if (dt == null)
            {
                return NoContent();
            }
            return Ok(dt.ToDynamic());
            //  }
            //catch (Exception ex)
            //{
            //    //ExceptionUtility.LogExceptionAsync(ex);
            //    return StatusCode(500);
            //}
        }


        //[HttpPost, Route("Save")]
        public IActionResult Save([FromBody]PayinSlip payinSlip)
        {
            // try
            // {
            SessionBO objSessionBo = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            // objPayinslipstagBo objAgencySaveMasterBO = objsaveDetails.objAgencySaveMasterBO;
            List<PayinslipStagingBo> payinslipStagingBos = payinSlip.payinslipBos;



            string strError = string.Empty;
            string appName = string.Empty;
            strError = string.Empty;
            string message = string.Empty;


            if (payinslipStagingBos.Count > 0)
            {
                PayinslipStagingBo stagingBo = new PayinslipStagingBo();
                List<PayinslipStagingBo> _dtls = new List<PayinslipStagingBo>();

                stagingBo.Payinslip_Stg_HdrSequence = payinslipStagingBos[0].Payinslip_Stg_HdrSequence;
                stagingBo.Payinslip_Source_Name = payinslipStagingBos[0].Payinslip_Source_Name;
                stagingBo.PortalSourceCode = payinslipStagingBos[0].PortalSourceCode;
                stagingBo.Req_State = payinslipStagingBos[0].Req_State;
                stagingBo.Req_Status = payinslipStagingBos[0].Req_Status;
                stagingBo.process_flag = payinslipStagingBos[0].process_flag;
                stagingBo.Active_Flg = payinslipStagingBos[0].Active_Flg;
                stagingBo.Process_Remarks = payinslipStagingBos[0].Process_Remarks;
                stagingBo.SCP_Code = payinslipStagingBos[0].SCP_Code;
                stagingBo.PortalSourceCode = payinslipStagingBos[0].PortalSourceCode;
                stagingBo.MCP_Code = payinslipStagingBos[0].MCP_Code;
                stagingBo.MCP_Broker_Code = payinslipStagingBos[0].MCP_Broker_Code;
                stagingBo.SCP_Broker_Code = payinslipStagingBos[0].SCP_Broker_Code;
                stagingBo.Employee_Code = payinslipStagingBos[0].Employee_Code;
                stagingBo.ADO_Indicator = payinslipStagingBos[0].ADO_Indicator;
                stagingBo.CMS_Type = payinslipStagingBos[0].CMS_Type;
                stagingBo.CP_Trans_Ref_No = payinslipStagingBos[0].CP_Trans_Ref_No;
                stagingBo.MF_Sys_Ref_No = payinslipStagingBos[0].MF_Sys_Ref_No;
                stagingBo.Ref_Type = payinslipStagingBos[0].Ref_Type;
                stagingBo.Ref_Cust_Code = payinslipStagingBos[0].Ref_Cust_Code;
                stagingBo.Ref_RM_Code = payinslipStagingBos[0].Ref_RM_Code;
                stagingBo.Ref_Other_Code = payinslipStagingBos[0].Ref_Other_Code;
                stagingBo.Cheque_Number = payinslipStagingBos[0].Cheque_Number;
                stagingBo.process_flag = payinslipStagingBos[0].process_flag;
                stagingBo.Active_Flg = "1";
                stagingBo.Process_Remarks = payinslipStagingBos[0].Process_Remarks;
                stagingBo.CMS_Bank_Name = payinslipStagingBos[0].CMS_Bank_Name;
                stagingBo.CMS_Branch_Name = payinslipStagingBos[0].CMS_Branch_Name;
                stagingBo.CMS_IFSC_Code = payinslipStagingBos[0].CMS_IFSC_Code;
                stagingBo.CMS_MICR_Code = payinslipStagingBos[0].CMS_MICR_Code;
                stagingBo.Applicant_Name = payinslipStagingBos[0].Applicant_Name;
                stagingBo.Application_No = payinslipStagingBos[0].Application_No;
                stagingBo.MF_Branch_Name = payinslipStagingBos[0].MF_Branch_Name;
                stagingBo.MF_Branch_Code = payinslipStagingBos[0].MF_Branch_Code;
                stagingBo.SCP_Location_Code = payinslipStagingBos[0].SCP_Location_Code;
                stagingBo.SCP_Location_Name = payinslipStagingBos[0].SCP_Location_Name;
                stagingBo.Entry_Date = payinslipStagingBos[0].Entry_Date;
                stagingBo.Cheque_Date = payinslipStagingBos[0].Cheque_Date;
                stagingBo.Cheque_Amount = payinslipStagingBos[0].Cheque_Amount;
                stagingBo.Drawn_Bank_Name = payinslipStagingBos[0].Drawn_Bank_Name;
                stagingBo.Drawn_Branch_name = payinslipStagingBos[0].Drawn_Branch_name;
                stagingBo.Cheque_Amount = payinslipStagingBos[0].Cheque_Amount;
                stagingBo.Pickup_Date = payinslipStagingBos[0].Pickup_Date;
                stagingBo.CreatedByName = objSessionBo.CreatedByUName;
                stagingBo.CreatedType = objSessionBo.Agency_Type;//item.CreatedType;
                stagingBo.CreatedIP = GetIPAddress();
                stagingBo.SessionID = objSessionBo.Session_ID.ToString();//item.SessionID;
                stagingBo.FormCode = Convert.ToString(HttpContext.Session.GetString("SubModeCode")); //item.FormCode;
                stagingBo.Dummy = payinslipStagingBos[0].Dummy;
                stagingBo.Payinslip_No = payinslipStagingBos[0].Payinslip_No;
                stagingBo.Remarks = payinslipStagingBos[0].Remarks;
                stagingBo.Req_Remarks = payinslipStagingBos[0].Remarks;
                stagingBo.CMS_LOC_CODE = payinslipStagingBos[0].CMS_LOC_CODE;
                stagingBo.CMS_LOC_NAME = payinslipStagingBos[0].CMS_LOC_NAME;
                stagingBo.Drawn_Bank_IFSC = payinslipStagingBos[0].Drawn_Bank_IFSC;
                stagingBo.Drawn_Bank_MICR = payinslipStagingBos[0].Drawn_Bank_MICR;
                stagingBo.BTP_LOC_CODE = payinslipStagingBos[0].BTP_LOC_CODE;
                stagingBo.BTP_LOC_DESC = payinslipStagingBos[0].BTP_LOC_DESC;
                stagingBo.AgencyCode = objSessionBo.Agency_Cd;
                stagingBo.Agencyname = objSessionBo.Agency_Name;
                stagingBo.count = payinslipStagingBos[0].count;

                foreach (var item in payinslipStagingBos)
                {
                    PayinslipStagingBo stagingBo1 = new PayinslipStagingBo();
                    stagingBo1 = new PayinslipStagingBo()
                    {
                        Payinslip_Stg_HdrSequence = item.Payinslip_Stg_HdrSequence,
                        Payinslip_Source_Name = item.Payinslip_Source_Name,
                        PortalSourceCode = item.PortalSourceCode,
                        Req_State = item.Req_State,
                        Req_Status = item.Req_Status,
                        process_flag = item.process_flag,
                        Active_Flg = "1",
                        Process_Remarks = item.Process_Remarks,
                        SCP_Code = item.SCP_Code,
                        MCP_Code = item.MCP_Code,
                        MCP_Broker_Code = item.MCP_Broker_Code,
                        SCP_Broker_Code = item.SCP_Broker_Code,
                        Employee_Code = item.Employee_Code,
                        ADO_Indicator = item.ADO_Indicator,
                        CMS_Type = item.CMS_Type,
                        CP_Trans_Ref_No = item.CP_Trans_Ref_No,
                        MF_Sys_Ref_No = item.MF_Sys_Ref_No,
                        Ref_Type = item.Ref_Type,
                        Ref_Cust_Code = item.Ref_Cust_Code,
                        Ref_RM_Code = item.Ref_RM_Code,
                        Ref_Other_Code = item.Ref_Other_Code,
                        Cheque_Number = item.Cheque_Number,
                        CMS_Bank_Name = item.CMS_Bank_Name,
                        CMS_Branch_Name = item.CMS_Branch_Name,
                        CMS_IFSC_Code = item.CMS_IFSC_Code,
                        CMS_MICR_Code = item.CMS_MICR_Code,
                        Applicant_Name = item.Applicant_Name,
                        Application_No = item.Application_No,
                        MF_Branch_Name = item.MF_Branch_Name,
                        MF_Branch_Code = item.MF_Branch_Code,
                        SCP_Location_Code = item.SCP_Location_Code,
                        SCP_Location_Name = item.SCP_Location_Name,
                        Entry_Date = item.Entry_Date,
                        Cheque_Date = item.Cheque_Date,
                        Cheque_Amount = item.Cheque_Amount,
                        Drawn_Bank_Name = item.Drawn_Bank_Name,
                        Drawn_Branch_name = item.Drawn_Branch_name,
                        Pickup_Date = item.Pickup_Date,
                        CreatedByName = objSessionBo.CreatedByUName,
                        CreatedType = objSessionBo.Agency_Type,//item.CreatedType,
                        CreatedIP = GetIPAddress(),
                        SessionID = objSessionBo.Session_ID.ToString(),//item.SessionID,
                        FormCode = Convert.ToString(HttpContext.Session.GetString("SubModeCode")), //item.FormCode,
                        Dummy = item.Dummy,
                        Payinslip_No = item.Payinslip_No,
                        Remarks = item.Remarks,
                        Req_Remarks = item.Remarks,
                        CMS_LOC_CODE = item.CMS_LOC_CODE,
                        CMS_LOC_NAME = item.CMS_LOC_NAME,
                        Drawn_Bank_IFSC = item.Drawn_Bank_IFSC,
                        Drawn_Bank_MICR = item.Drawn_Bank_MICR,
                        BTP_LOC_CODE = item.BTP_LOC_CODE,
                        BTP_LOC_DESC = item.BTP_LOC_DESC,
                        count = item.count,
                    };
                    _dtls.Add(stagingBo1);

                }

                DataTable dt = objDal.SaveMainPayinslip_Hdr(stagingBo, _dtls);
                long HDRID = Convert.ToInt64(dt.Rows[0]["HDR_Id"]);
                //stagingBo.Payinslip_Stg_HdrSequence = HDRID.ToString();
                //res = objDal.SaveMainPayinslip_Dtl(stagingBo);
                message = "PIS No: " + Convert.ToString(dt.Rows[0]["PayInSlipNo"]) + " generated successfully for CPTP Location: " + payinslipStagingBos[0].BTP_LOC_DESC +
                    " - CMS Bank: " + payinslipStagingBos[0].CMS_Bank_Name + " - Bank Branch: " + payinslipStagingBos[0].CMS_Branch_Name + " - Count: " + payinslipStagingBos[0].count;
                /*
                 *            
select @bPk_t_BT_Payinslip_Hdr_ID as HDR_Id,   'FPIH' + CAST (@bPk_t_BT_Payinslip_Hdr_ID AS NVARCHAR(50) )  PIS_HdrSequence,
@PayinSlip_No as PayInSlipNo,@strCMS_Bank_Name as CMSBankName,@strCMS_Branch_Name as CMSBankBranch
PayinSlip <number> Generated Successfully for BTP Location: <BTP Location> - CMS Bank: <CMS Bank> - Bank Branch: <CMS Bank> - Count 

*/




                if (HDRID != 0)
                {
                    return Ok(new { result = message, isResponce = true });
                }
            }

            return Ok(new { result = "Something went wrong", isResponce = false });
            // return Ok(new { result = , isResponce = false });
            // }




            //catch (Exception ex)
            //{
            //    ExceptionUtility.LogExceptionAsync(ex);
            //    return Ok(new { result = "Something went wrong", isResponce = false, errormessage = ex.Message });
            //}
        }

        public class PayinSlip
        {
            public List<PayinslipStagingBo> payinslipBos { get; set; }

        }
        public string GetIPAddress()
        {
            var remoteIpAddress = HttpContext.Features.Get<IHttpConnectionFeature>()?.RemoteIpAddress;
            return remoteIpAddress.ToString();
        }
        public IActionResult GetpainsliphdrData(string CMSBankName, string MFBranchCode, string CMSLOCCODE, string CMSLOCNAME, string fromdate, string todate,
            string BTP_LocationCode, string BTP_LocationDesc)
        {

            //  try
            //  { //string Err = "";
            SessionBO objSessionBo = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            string AgencyName = objSessionBo.Agency_Name;
            string AgencyCode = objSessionBo.Agency_Cd;

            DataTable dt = objDal.GetPayiniSlipHdrData(CMSBankName, MFBranchCode, CMSLOCCODE, CMSLOCNAME, fromdate, todate, BTP_LocationCode, BTP_LocationDesc, AgencyName, AgencyCode).Tables[0];
            if (dt == null)
            {
                return NoContent();
            }
            else
            {
                return Ok(dt.ToDynamic());
            }

            // }
            //catch (Exception ex)
            //{
            //    ExceptionUtility.LogExceptionAsync(ex);
            //    return StatusCode(500);
            //}
        }
        public IActionResult GetPayinslipDtlData(string HdrSeq)
        {

            // try
            //{ //string Err = "";
            DataSet dt = objDal.GetPayiniSlipDtlData(HdrSeq);
            if (dt == null)
            {
                return NoContent();
            }
            return Ok(dt.ToDynamic());
            // }
            //catch (Exception ex)
            //{
            //    ExceptionUtility.LogExceptionAsync(ex);
            //    return StatusCode(500);
            //}
        }
        public IActionResult GetStagingData(string CMSBankName, string MFBranchCode, string BTP_Agency_Branch_Code, string BTP_Agency_BranchName)
        {


            SessionBO objSessionBo = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            string AgencyName = objSessionBo.Agency_Name;
            string AgencyCode = objSessionBo.Agency_Cd;
            string EntityType = objSessionBo.Entity_Type_Code;
            string usercode = objSessionBo.Agency_Usr_Clustered_ID;
            DataTable dt = objDal.GetStagingData(CMSBankName, MFBranchCode, BTP_Agency_Branch_Code, BTP_Agency_BranchName, AgencyName, AgencyCode, objSessionBo.Source, EntityType, usercode);

            if (dt != null && dt.Rows.Count > 0)
                return Ok(dt.ToDynamic());
            else
                return NoContent();


        }
        public IActionResult GetPayinslipDtlDataEx(string HdrSeq)
        {



            DataTable dt = objDal.GetPayinslipDtlDataEx(HdrSeq);
            if (dt == null)
            {
                return NoContent();
            }
            return Ok(dt.ToDynamic());
            //  }
            //catch (Exception ex)
            //{
            //    ExceptionUtility.LogExceptionAsync(ex);
            //    return StatusCode(500);
            //}
        }
        public IActionResult GeneratePDF([FromBody]GeneratePDFBO generatePDFBO)
        {
            // try
            //  {

            Rectangle rec = new Rectangle(PageSize.A4.Rotate());// 144, 720);
            Document pdfDocument = new Document(rec);
            FontFactory.GetFont("Tahoma", 50, iTextSharp.text.BaseColor.Blue);
            //pdfDocument.SetMargins(7f, 7f, 10f, 1f);
            //IHostingEnvironment hostingEnvironment;
            string path = @"E:\WorkingDrive\100001545\100001545\FD\New folder\MMFSL_FDCP\MF_FD_E_SAR_BTP_FRONT_OFFICE\MF_FD_E_SAR_BTP_FRONT_OFFICE\wwwroot";
            string pdfpath = Path.Combine(path, @"TempDocs\Temp.pdf");
            if (System.IO.File.Exists(pdfpath))
            {
                System.IO.File.Delete(pdfpath);
            }
            Stream OS = new FileStream(pdfpath, FileMode.OpenOrCreate);
            PdfWriter.GetInstance(pdfDocument, OS);
            pdfDocument.Open();
            //pdfDocument.SetPageSize(iTextSharp.text.PageSize.A4.Rotate());
            iTextSharp.text.html.simpleparser.StyleSheet styles = new iTextSharp.text.html.simpleparser.StyleSheet();
            Hashtable hashtable = new Hashtable();
            hashtable.Add("background-color", "#247fa8");
            hashtable.Add("color", "##fff");
            hashtable.Add("border", "1px solid #000000");
            hashtable.Add("font-size", "10px");
            hashtable.Add("font-weight", "bold");

            Hashtable hashtabletd = new Hashtable();
            // hashtabletd.Add("background-color", "#247fa8");
            //hashtabletd.Add("color", "##fff");
            hashtabletd.Add("border", "1px solid #000000");
            hashtabletd.Add("font-size", "9px");
            hashtabletd.Add("font-weight", "normal");



            styles.ApplyStyle("<th>", hashtable);
            //styles.LoadTagStyle("<th>", hashtable);
            //styles.LoadTagStyle("<td>", hashtabletd);

            string html = HttpUtility.HtmlDecode(generatePDFBO.HTMLString);//.Replace("<tbody>", "").Replace("</tbody>","");
            HtmlString bn = new HtmlString("<html><head></head><body>" + html + "</body></html>");

            //string ControlPath = System.IO.File.ReadAllText(Path.Combine(path, @"TempDocs\trmphtml.html"));
            //StringReader str = new StringReader("<html><head></head><body>" + generatePDFBO.HTMLString + "</body></html>");
            StringReader str = new StringReader(bn.Value);
            //StreamReader str = new StreamReader(Path.Combine(path, @"TempDocs\trmphtml.html"));
            HtmlWorker htmlworker = new HtmlWorker(pdfDocument);
            htmlworker.Style = styles;
            htmlworker.Parse(str);
            pdfDocument.Close();
            OS.Close();
            string filebytes = "";




            if (!string.IsNullOrEmpty(pdfpath))
            {
                //dataTable.Columns.Add("NewAppPath");
                //dataTable.Columns.Add("Filename");
                //System.Net.WebClient webClient = new System.Net.WebClient();
                //byte[] strFilePath = webClient.DownloadData(NewAppPath);
                byte[] strFilePath = System.IO.File.ReadAllBytes(pdfpath);
                //filebytes = "data:application/pdf;headers:filename%3D23071033%2Epdf; base64," + Convert.ToBase64String(strFilePath);
                filebytes = Convert.ToBase64String(strFilePath);

            }



            GeneratePDFRespBO generatePDFResp = new GeneratePDFRespBO();
            generatePDFResp.PDFBytes = filebytes;

            return Ok(generatePDFResp);
            //  }
            //catch (Exception ex)
            //{
            //    ExceptionUtility.LogExceptionAsync(ex);
            //    throw ex;
            //}
        }



    }
}
