using System;
using System.Collections.Generic;
using System.Linq;
using Extension;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using FD_UNIFIED_CPTP.App_Code;
using FD_UNIFIED_CPTP.Models;
using FD_UNIFIED_CPTP.Services;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WA_FD_CP_AUTHENTICATION_MODEL;

namespace FD_CPTP_UNIFIED.Controllers
{
    public class Signzy_ServicesController : Controller
    {
        private readonly DocumentUploadDAL objDAL;

        public Signzy_ServicesController()
        {
            objDAL = new DocumentUploadDAL(Startup.Configuration);
        }

        //[HttpPost]
        //public IActionResult Check_Basic_Forgery([FromBody]Signzy_Req_BO objReqBO)
        //{
        //    var session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
        //    var AppMenu = HttpContext.Session.GetObject<IList<UserMenuItem>>("UserAppMenus");
        //    if (AppMenu != null && AppMenu != null && AppMenu.Count() > 0)
        //    {
        //        objReqBO.App_Code = Convert.ToString(AppMenu.FirstOrDefault().AppCode);
        //    }
        //    objReqBO.CreatedBy = session.CreatedBy;
        //    objReqBO.CreatedByUName = session.CreatedByUName;
        //    objReqBO.CreatedIP = session.CreatedIP;
        //    objReqBO.SessionId = session.Session_ID;
        //    string extension = string.Empty;
        //    objReqBO.OVD_FrontImage = Get_ImgFullscreen(objReqBO.DocId, ref extension);
        //    //ONLY IMAGE SUPORTED
        //    if (extension.ToUpper() != "JPG" && extension.ToUpper() != "JPEG")
        //    {
        //        return Ok(new { ErrorCode = "", ErrorMessage = "" });
        //    }
        //    objReqBO.OVD_FrontImageFileExtension = extension;
        //    objReqBO.OVD_ForgeryCheck_Parameters = new Dictionary<string, string>();
        //    foreach (var item in objReqBO.Parameters)
        //    {
        //        objReqBO.OVD_ForgeryCheck_Parameters.Add(item.key, item.value);
        //    }
        //    var basic_Forgery_Check = new Basic_Forgery_Check();
        //    return Ok(basic_Forgery_Check.Post(objReqBO));
        //}

        [HttpPost]
        public IActionResult Check_Driving_License([FromHeader]Signzy_Req_BO objReqBO)
        {
            var session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            var AppMenu = HttpContext.Session.GetObject<IList<UserMenuItem>>("UserAppMenus");
            if (AppMenu != null && AppMenu != null && AppMenu.Count() > 0)
            {
                objReqBO.App_Code = Convert.ToString(AppMenu.FirstOrDefault().AppCode);
            }
            objReqBO.CreatedBy = session.CreatedBy;
            objReqBO.CreatedByUName = session.CreatedByUName;
            objReqBO.CreatedIP = session.CreatedIP;
            objReqBO.SessionId = session.Session_ID;
            objReqBO.OVD_FrontImage = FormFileExtensions.GetBytes(objReqBO.File);
            var driving_License_Extraction = new Driving_License_Extraction();
            return Ok(driving_License_Extraction.Post(objReqBO));
        }

        [HttpPost]
        public IActionResult Check_OVD_Classification([FromHeader]Signzy_Req_BO objReqBO)
        {
            var session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            var AppMenu = HttpContext.Session.GetObject<IList<UserMenuItem>>("UserAppMenus");
            if (AppMenu != null && AppMenu != null && AppMenu.Count() > 0)
                objReqBO.App_Code = Convert.ToString(AppMenu.FirstOrDefault().AppCode) ?? "CPTP_UNI";
            objReqBO.CreatedBy = session.CreatedBy;
            objReqBO.CreatedByUName = session.CreatedByUName;
            objReqBO.CreatedIP = session.CreatedIP;
            objReqBO.SessionId = session.Session_ID;
            objReqBO.OVD_FrontImage = FormFileExtensions.GetBytes(objReqBO.File);
            var OVD_Classification = new OVD_Classification();
            return Ok(OVD_Classification.Post(objReqBO));
        }

        [HttpPost]
        public IActionResult Check_PAN_Data([FromHeader]Signzy_Req_BO objReqBO)
        {
            var session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            var AppMenu = HttpContext.Session.GetObject<IList<UserMenuItem>>("UserAppMenus");
            if (AppMenu != null && AppMenu != null && AppMenu.Count() > 0)
                objReqBO.App_Code = Convert.ToString(AppMenu.FirstOrDefault().AppCode) ?? "CPTP_UNI";
            objReqBO.CreatedBy = session.CreatedBy;
            objReqBO.CreatedByUName = session.CreatedByUName;
            objReqBO.CreatedIP = session.CreatedIP;
            objReqBO.SessionId = session.Session_ID;
            objReqBO.OVD_FrontImage = FormFileExtensions.GetBytes(objReqBO.File);
            var PAN_Data_Extraction = new PAN_Data_Extraction();
            return Ok(PAN_Data_Extraction.Post(objReqBO));
        }

        //[HttpPost]
        //public IActionResult Extract_PAN_Data([FromBody]Signzy_Req_BO objReqBO)
        //{
        //    var session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
        //    var AppMenu = HttpContext.Session.GetObject<IList<UserMenuItem>>("UserAppMenus");
        //    if (AppMenu != null && AppMenu != null && AppMenu.Count() > 0)
        //    {
        //        objReqBO.App_Code = Convert.ToString(AppMenu.FirstOrDefault().AppCode);
        //    }
        //    objReqBO.CreatedBy = session.CreatedBy;
        //    objReqBO.CreatedByUName = session.CreatedByUName;
        //    objReqBO.CreatedIP = session.CreatedIP;
        //    objReqBO.SessionId = session.Session_ID;
        //    string extension = string.Empty;
        //    objReqBO.OVD_FrontImage = Get_ImgFullscreen(objReqBO.DocId, ref extension);
        //    objReqBO.OVD_FrontImageFileExtension = extension;
        //    var PAN_Data_Extraction = new PAN_Data_Extraction();
        //    return Ok(PAN_Data_Extraction.Post(objReqBO));
        //}

        //[HttpPost]
        //public IActionResult Extract_Driving_License_Data([FromBody]Signzy_Req_BO objReqBO)
        //{
        //    var session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
        //    var AppMenu = HttpContext.Session.GetObject<IList<UserMenuItem>>("UserAppMenus");
        //    if (AppMenu != null && AppMenu != null && AppMenu.Count() > 0)
        //    {
        //        objReqBO.App_Code = Convert.ToString(AppMenu.FirstOrDefault().AppCode);
        //    }
        //    objReqBO.CreatedBy = session.CreatedBy;
        //    objReqBO.CreatedByUName = session.CreatedByUName;
        //    objReqBO.CreatedIP = session.CreatedIP;
        //    objReqBO.SessionId = session.Session_ID;
        //    string extension = string.Empty;
        //    objReqBO.OVD_FrontImage = Get_ImgFullscreen(objReqBO.DocId, ref extension);
        //    objReqBO.OVD_FrontImageFileExtension = extension;
        //    var driving_License_Extraction = new Driving_License_Extraction();
        //    return Ok(driving_License_Extraction.Post(objReqBO));
        //}

        //private async Task<byte[]> Get_ImgFullscreen(string _id, ref string extension)
        //{
        //    string doc_Path = string.Empty;
        //    string fileExt = string.Empty;
        //    string status = string.Empty;
        //    string filename = string.Empty;
        //    byte[] byteArry = null;

        //    ImpersonateUser _imp = new ImpersonateUser();
        //    string nasUserId = Startup.Configuration["FS_key:DocUserID"];
        //    string nasPassword = Startup.Configuration["FS_key:DocPWD"];
        //    string imgPath = string.Empty;
        //    string rootPath = string.Empty;

        //    WebClient webClient = new WebClient();
        //    string fileName = string.Empty;
        //    DataTable dt = await objDAL.Get_ImgFullscreenAsync(_id);
        //    if (dt != null && dt.Rows.Count > 0)
        //    {
        //        imgPath = dt.Rows[0][0].ToString();
        //        filename = dt.Rows[0][1].ToString();
        //        fileExt = dt.Rows[0][1].ToString().Split(".")[1];
        //        rootPath = dt.Rows[0][2].ToString();

        //        WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
        //        {
        //            if (fileExt.ToLower() == "pdf" && imgPath.Length > 0)
        //            {
        //                byteArry = webClient.DownloadData(imgPath);  /// this convert ther byte
        //                status = "success";
        //            }
        //            else if (fileExt.ToLower() == "tif" || fileExt.ToLower() == "tiff")
        //            {
        //                string[] ImgPaths = FormFileExtensions.ConvertTiffToJpeg(imgPath);

        //                //combine multiple images
        //                int count = 0;
        //                FileInfo[] fileinfo = new FileInfo[ImgPaths.Length];
        //                foreach (string ImgPath in ImgPaths)
        //                {

        //                    fileinfo[count] = new FileInfo(ImgPath);
        //                    count += 1;
        //                }
        //                string TempPath = Path.Combine(Startup.Configuration["TempDocPath"], Path.GetFileNameWithoutExtension(filename) + ".jpg");
        //                string singleFile = "";
        //                if (fileinfo.Length > 1)
        //                    singleFile = FormFileExtensions.CombineImages(fileinfo, TempPath);
        //                else
        //                    singleFile = ImgPaths[0];

        //                byteArry = System.IO.File.ReadAllBytes(singleFile);
        //                status = "success";
        //            }
        //            else if (imgPath.Length > 0)
        //            {
        //                byteArry = webClient.DownloadData(imgPath);  /// this convert ther byte
        //                status = "success";
        //            }
        //        });
        //    }
        //    extension = fileExt;
        //    return byteArry;
        //}

    }
}