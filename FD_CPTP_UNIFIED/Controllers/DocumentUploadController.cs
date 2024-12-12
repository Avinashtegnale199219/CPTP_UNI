using System;
using System.Data;
using System.IO;
using System.Net;
using System.Security.Principal;
using System.Threading.Tasks;
using Extension;
using FD_CPTP_UNIFIED;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using FD_OFFLINE_CKYC_UPDATE.App_Code.Services;
using FD_UNIFIED_CPTP.App_Code;
using Impersonate;
using MF_FD_CP_QUERY_WINDOW_APP.App_Code.BusinessObject;
using MF_FD_ESARATHI_APP.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_BackOffice.v2.Controllers
{

    [Produces("Application/json")]
    public class DocumentUploadController : Controller
    {
        private readonly DocumentUploadDAL objDAL;

        public DocumentUploadController()
        {
            objDAL = new DocumentUploadDAL(Startup.Configuration);
        }

        [HttpPost]
        public async Task<IActionResult> Save_KYCDocs([FromHeader]DocUploadBO _DocUpload)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            ImpersonateUser _imp = new ImpersonateUser();
            string nasUserId = Startup.Configuration["FS_key:DocUserID"];
            string nasPassword = Startup.Configuration["FS_key:DocPWD"];
            _DocUpload.DocPath = Startup.Configuration["FS_key:DocPath"];

            string[] arrayDocType = _DocUpload.Doc_Type_SubType.Split("|");
            _DocUpload.DocType = arrayDocType[0];
            _DocUpload.DocSubType = arrayDocType[1];

            var type = _DocUpload.Doc_File.ContentType.ToLower();

            if (_DocUpload.Doc_File == null)
            {
                return Ok(new { validResponse = false, msg = "Please select file to upload." });
            }

            if (_DocUpload.Doc_File.FileName.Split(".").Length != 2)
            {
                return Ok(new { validResponse = false, msg = "Invalid file name, Please upload valid file." });
            }

            if (type != "image/jpg" && type != "image/jpeg" && type != "application/pdf" && type != "image/tiff" && type != "image/tif")
            {
                return Ok(new { validResponse = false, msg = "File should be in jpg/jpeg/pdf/tif/tif format." });
            }

            if (_DocUpload.Doc_File.Length > 5000000)
            {
                return Ok(new { validResponse = false, msg = "Selected document could not be uploaded. Exceeding the maximum file size of 5MB !!" });
            }

            if (!FormFileExtensions.CheckFileContent(_DocUpload.Doc_File))
            {
                return Ok(new { validResponse = false, msg = "Invalid file format." });

            }

            //file upload

            string SequenceNo = DateTime.Now.ToString("dd/MM/yyyy") + DateTime.Now.ToString("hh:mm:ss");
            SequenceNo = SequenceNo.Replace("/", "");
            SequenceNo = SequenceNo.Replace(":", "");
            if (_DocUpload.Doc_File != null)
            {
                _DocUpload.DocExtention = _DocUpload.Doc_File.FileName.Split(".")[1].ToUpper();

                _DocUpload.DocName = _DocUpload.App_No + "_" + _DocUpload.HolderTypeText + "_" + _DocUpload.Doc_Type_SubType_Text + "_" + _DocUpload.DocSequenceNo + "_" + SequenceNo + "." + _DocUpload.DocExtention;

                DataTable dtMaskConfig = await objDAL.GET_CMN_WEB_CONFIG_MST(session.Source, "UID_MASKING", "API_CALL");
                DataTable dtValConfig = await objDAL.GET_CMN_WEB_CONFIG_MST(session.Source, "UID_MASKING", "API_VALIDATION_CTRL");

                bool IsUIDMaskingEnabled = true;
                bool IsUIDMaskingValidationRequired = true;

                if (dtMaskConfig != null && dtMaskConfig.Rows.Count > 0)
                {
                    IsUIDMaskingEnabled = Convert.ToString(dtMaskConfig.Rows[0]["WC_Value"]) == "0" ? false : true;
                }

                if (dtValConfig != null && dtValConfig.Rows.Count > 0)
                {
                    IsUIDMaskingValidationRequired = Convert.ToString(dtValConfig.Rows[0]["WC_Value"]) == "0" ? false : true;
                }

                if (IsUIDMaskingEnabled && _DocUpload.DocSubType == "AADHARCARD_A")
                {
                    string base64Data = string.Empty;

                    using (var ms = new MemoryStream())
                    {
                        _DocUpload.Doc_File.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        base64Data = Convert.ToBase64String(fileBytes);
                        // act on the Base64 data
                    }

                    var FullPath = Path.Combine(_DocUpload.DocPath, _DocUpload.DocName);

                    UIDMasking uIDAIMask = new UIDMasking();

                    UIDMaskReqBO reqBO = new UIDMaskReqBO();
                    if (_DocUpload.DocExtention.ToUpper() == "PDF")
                        reqBO.FileType = _DocUpload.DocExtention.ToUpper();
                    else
                        reqBO.FileType = "IMAGE";
                    reqBO.FileData = base64Data;
                    reqBO.Trans_Ref_No = _DocUpload.App_No;
                    reqBO.CreatedIP = session.CreatedIP;
                    reqBO.CreatedBy = session.CreatedBy;
                    reqBO.CreatedByUName = session.CreatedByUName;
                    reqBO.CreatedType = session.CreatedType;
                    reqBO.SessionID = session.Session_ID.ToString();
                    reqBO.Form_Code = session.FormCode;
                    reqBO.Source = session.Source;
                    reqBO.API_Response_File_Path = FullPath;
                    reqBO.ApplNo = _DocUpload.App_No;
                    reqBO.FolioNo = _DocUpload.FolioNo;
                    reqBO.HolderType = _DocUpload.HolderType;
                    reqBO.CheckDocumentType = true;
                    reqBO.AadharSuffix = _DocUpload.AadharSuffix;

                    UIDMaskRespBO res = await uIDAIMask.Post(reqBO);
                    byte[] byteArray = null;

                    if (res.IntStatusCode == "MF-SYS-200" && res.Result != null)
                    {
                        byteArray = Convert.FromBase64String(res.Result.FileData);
                        if (Convert.ToString(res.Result.AadhaarSuffix) != null && Convert.ToString(res.Result.AadhaarSuffix) != "")
                            _DocUpload.KYCDocValue = res.Result.AadhaarSuffix;
                        _DocUpload.IsDocumentMasked = true;

                        //WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
                       // {
                            System.IO.File.WriteAllBytes(FullPath, byteArray);
                       //});
                    }
                    else if (res.IntStatusCode == "MF-SYS-201")
                    {
                        //WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
                       // {
                            FormFileExtensions.SaveFile(_DocUpload.DocPath, _DocUpload.DocName, _DocUpload.Doc_File, _DocUpload.DocExtention);
                        //});
                    }
                    else if (res.IntStatusCode == "MF-SYS-400")
                    {
                        return Ok(new { validResponse = false, msg = "Please upload valid document" });
                    }
                    else if (res.IntStatusCode == "MF-SYS-401")
                    {
                        return Ok(new { validResponse = false, msg = "Invalid/Incorrect file" });
                    }
                    else if (IsUIDMaskingValidationRequired && res.IntStatusCode == "MF-SYS-402")
                    {
                        return Ok(new { validResponse = false, msg = "Kindly upload valid Aadhar copy" });
                    }
                    else if (!IsUIDMaskingValidationRequired && res.IntStatusCode == "MF-SYS-402")
                    {
                        //WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
                        //{
                            FormFileExtensions.SaveFile(_DocUpload.DocPath, _DocUpload.DocName, _DocUpload.Doc_File, _DocUpload.DocExtention);
                        //});
                    }
                    else if (res.IntStatusCode == "MF-SYS-403")
                    {
                        return Ok(new { validResponse = false, msg = "Please upload valid document. Uploaded file should not be password protected!" });
                    }
                    else if (res.IntStatusCode == "MF-SYS-405")
                    {
                        return Ok(new { validResponse = false, msg = "Kindly upload valid Aadhar copy / Choose any other valid document" });
                    }
                    else if (res.IntStatusCode == "MF-SYS-500")
                    {
                        return Ok(new { validResponse = false, msg = "Something went wrong while uploading document. Kindly upload valid Aadhar copy / Choose any other valid document" });
                    }
                    else
                    {
                        throw new Exception("Aadhar masking API error:  " + res.Error);
                    }
                }
                else
                {
                    //WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
                    //{
                        FormFileExtensions.SaveFile(_DocUpload.DocPath, _DocUpload.DocName, _DocUpload.Doc_File, _DocUpload.DocExtention);

                   //});
                }
            }

            DataTable dt = objDAL.Save_KYCDocs(_DocUpload, session);

            if (dt == null)
            {
                return Ok(new { validResponse = false, msg = "Internal server error." });
            }

            return Ok(new { validResponse = true, msg = "Document uploaded successfully." });
        }

        [HttpPost]
        public async Task<IActionResult> InsertDocumentUploadLogAsync([FromBody]DocUploadBO DocUpload)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            await objDAL.InsertDocumentUploadLogAsync(DocUpload, session);
            return Ok();
        }

        [HttpGet]
        public async Task<IActionResult> Get_HolderTypeAsync()
        {

            using (DataTable dt = await objDAL.Get_HolderTypeAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Get_FilterDocTypeAsync()
        {
            //DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

            using (DataTable dt = await objDAL.Get_FilterDocTypeAsync())
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        public async Task<IActionResult> Get_DocType_MstAsync(string _HolderType, string DepositorStatus, string Appl_No)
        {
            //DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();
            DataTable dt = await objDAL.Get_DocType_MstAsync(_HolderType, DepositorStatus, Appl_No);

            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }

            return NoContent();



        }

        [HttpGet]
        public async Task<IActionResult> Get_SubDocType_MstAsync(string _HolderType, string DepositorStatus, string Appl_No)
        {
            //DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

            using (DataTable dt = await objDAL.Get_DocType_MstAsync(_HolderType, DepositorStatus, Appl_No))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }

                return NoContent();

            }

        }

        [HttpGet]
        public async Task<IActionResult> Get_OVDAsync(string _ApplNo)
        {
            //DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            DataTable dt = await objDAL.Get_OVDAsync(_ApplNo, session);

            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }

            return NoContent();



        }

        [HttpGet]
        public async Task<IActionResult> Get_KYCDocumentAsync(string _ApplNo)
        {
            //DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            using (DataTable dt = await objDAL.Get_KYCDocumentAsync(_ApplNo, session))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt);
                }
            }
            return NoContent();

        }

        [HttpGet]
        public async Task<IActionResult> Get_KYCDocument_with_Filter(string _ApplNo, string _Filter)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            DataTable dt = await objDAL.Get_KYCDocument_with_FilterAsync(_ApplNo, _Filter, session);
            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }
            return NoContent();
        }



        [HttpGet]
        public async Task<IActionResult> Get_Ismultiple(string _DocSubType)
        {

            DataTable dt = await objDAL.Get_IsmultipleAsync(_DocSubType.Split("|")[1]);
            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt);
            }

            return NoContent();
        }

        [HttpPost]
        public IActionResult Save_ApplicationForm([FromHeader] DocUploadApplicationFormBO _DocUpload)
        {
            bool validResponse = false;
            string msg = string.Empty;
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            DocumentUploadDAL objDal = new DocumentUploadDAL(Startup.Configuration);

            ImpersonateUser _imp = new ImpersonateUser();
            string nasUserId = Startup.Configuration["FS_key:DocUserID"];
            string nasPassword = Startup.Configuration["FS_key:DocPWD"];
            _DocUpload.DocPath = Startup.Configuration["FS_key:DocPath"];

            string[] nameCount = _DocUpload.Doc_File.FileName.Split(".");


            if (nameCount.Length == 2)
            {

                if (!FormFileExtensions.CheckFileContent(_DocUpload.Doc_File))
                {
                    return Ok(new { validResponse = false, msg = "Invalid file format." });

                }

                var type = _DocUpload.Doc_File.ContentType;
                if (type == "image/jpg" || type == "image/jpeg" || type == "application/pdf" || type == "image/tiff" || type == "image/tif")
                {
                    if (_DocUpload.Doc_File.Length < 4000000)
                    {

                        string filename = string.Empty;
                        string fileExt = string.Empty;
                        string SequenceNo = DateTime.Now.ToString("dd/MM/yyyy") + DateTime.Now.ToString("hh:mm:ss");
                        SequenceNo = SequenceNo.Replace("/", "");
                        SequenceNo = SequenceNo.Replace(":", "");
                        IFormFile file = null;
                        if (_DocUpload.Doc_File != null)
                        {
                            filename = string.Empty;
                            file = _DocUpload.Doc_File;
                            fileExt = file.FileName.Split(".")[1];
                            filename = System.IO.Path.GetFileName(file.FileName);
                            filename = _DocUpload.App_No + "_Investor_ApplicationForm_ApplicationForm_" + SequenceNo + "." + fileExt.ToLower();

                            //WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
                            //{

                               if (fileExt.ToUpper() != "PDF" && fileExt.ToUpper() != "TIFF" && fileExt.ToUpper() != "TIF")
                                {
                                    filename = filename.Split(".")[0] + ".jpeg";
                                    var ImagePath = Path.Combine(_DocUpload.DocPath, filename);
                                    FormFileExtensions.ReduceImageSize(file.OpenReadStream(), ImagePath, 0.8);
                               }
                               else
                               {
                                   FormFileExtensions.SaveFile(_DocUpload.DocPath, filename, file, fileExt);
                               }

                            //});
                            _DocUpload.DocName = filename;
                        }
                        _DocUpload.formCode = "";
                        _DocUpload.Session_ID = "";
                        _DocUpload.CreatedBy = "";
                        _DocUpload.CreatedByUName = "";
                        _DocUpload.CreatedIP = "";

                        DataTable dt = objDal.Save_ApplicationForm(_DocUpload, session);
                        if (dt == null)
                        {
                            validResponse = false;
                            msg = "Internal server error.";
                        }
                        else
                        {
                            validResponse = true;
                            msg = "Document uploaded successfully.";
                        }

                    }
                    else
                    {
                        validResponse = false;
                        msg = "Selected document could not be uploaded. Exceeding the maximum file size of 4MB !!";
                    }
                }
                else
                {
                    validResponse = false;
                    msg = "File should be jpg, jpeg, pdf, tiff, tif.";
                }
            }
            else
            {
                validResponse = false;
                msg = "Invalid file name, Please uplod valid file.";
            }
            return Ok(new { validResponse, msg });
        }

        [HttpGet]
        public async Task<IActionResult> Get_ImgFullscreen(string _id)
        {
            string doc_base64 = string.Empty;
            string doc_Path = string.Empty;
            string fileExt = string.Empty;
            string status = string.Empty;
            string filename = string.Empty;
            byte[] byteArry = null;

            ImpersonateUser _imp = new ImpersonateUser();
            string nasUserId = Startup.Configuration["FS_key:DocUserID"];
            string nasPassword = Startup.Configuration["FS_key:DocPWD"];
            string imgPath = string.Empty;
            string rootPath = string.Empty;

            WebClient webClient = new WebClient();
            string fileName = string.Empty;
            DataTable dt = await objDAL.Get_ImgFullscreenAsync(_id);

            if (dt != null && dt.Rows.Count > 0)
            {

                filename = dt.Rows[0][1].ToString();
                fileExt = dt.Rows[0][1].ToString().Split(".")[1];
                rootPath = dt.Rows[0][2].ToString();
                if (!rootPath.Contains(filename))
                    imgPath = Path.Combine(rootPath, filename);
                else
                    imgPath = rootPath;

                //WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
                //{
                    if (fileExt.ToLower() == "pdf" && imgPath.Length > 0)
                    {
                        byteArry = webClient.DownloadData(imgPath);  /// this convert ther byte
                        doc_base64 = "data:application/" + fileExt + ";base64," + Convert.ToBase64String(byteArry);
                        status = "success";
                    }
                    else if (fileExt.ToLower() == "tif" || fileExt.ToLower() == "tiff")
                    {
                        string[] ImgPaths = FormFileExtensions.ConvertTiffToJpeg(imgPath);

                        //combine multiple images
                        int count = 0;
                        FileInfo[] fileinfo = new FileInfo[ImgPaths.Length];
                        foreach (string ImgPath in ImgPaths)
                        {

                            fileinfo[count] = new FileInfo(ImgPath);
                            count += 1;
                        }
                        string TempPath = Path.Combine(Startup.Configuration["TempDocPath"], Path.GetFileNameWithoutExtension(filename) + ".jpg");
                        string singleFile = "";
                        if (fileinfo.Length > 1)
                            singleFile = FormFileExtensions.CombineImages(fileinfo, TempPath);
                        else
                            singleFile = ImgPaths[0];

                        byte[] byteData = System.IO.File.ReadAllBytes(singleFile);
                        string imreBase64Data = Convert.ToBase64String(byteData);
                        doc_base64 = "data:image/jpg;base64," + Convert.ToBase64String(byteData);
                        status = "success";
                    }
                    else if (imgPath.Length > 0)
                    {
                        byteArry = webClient.DownloadData(imgPath);  /// this convert ther byte
                        doc_base64 = "data:image/" + fileExt + ";base64," + Convert.ToBase64String(byteArry);
                        status = "success";
                    }
                //});
            }


            if (status == "success")
            {
                return Ok(new { doc_base64, doc_Path, fileExt, status, byteArry, filename });
            }
            return NoContent();

        }

        [HttpGet]
        public IActionResult Delete_Doc(string _id)
        {
            using (DataSet ds = objDAL.Delete_Doc(_id))
            {
                if (ds != null && ds.Tables.Count > 0 && ds.Tables[0].Rows.Count > 0)
                {
                    return Ok(ds.Tables[0].ToDynamic());
                }
                return NoContent();
            }
        }

        [HttpPost]
        public IActionResult SaveCancelledChequeCopy([FromHeader] UploadCancelledChequeCopyBO _DocUpload)
        {
            bool validResponse = false;
            string msg = string.Empty;
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            DocumentUploadDAL objDal = new DocumentUploadDAL(Startup.Configuration);

            ImpersonateUser _imp = new ImpersonateUser();
            string nasUserId = Startup.Configuration["FS_key:DocUserID"];
            string nasPassword = Startup.Configuration["FS_key:DocPWD"];
            _DocUpload.DocPath = Startup.Configuration["FS_key:DocPath"];

            string[] nameCount = _DocUpload.Doc_File.FileName.Split(".");


            if (nameCount.Length == 2)
            {

                if (!FormFileExtensions.CheckFileContent(_DocUpload.Doc_File))
                {
                    return Ok(new { validResponse = false, msg = "Invalid file format." });

                }

                var type = _DocUpload.Doc_File.ContentType;
                if (type == "image/jpg" || type == "image/jpeg" || type == "application/pdf" || type == "image/tiff" || type == "image/tif")
                {
                    if (_DocUpload.Doc_File.Length < 4000000)
                    {

                        string filename = string.Empty;
                        string fileExt = string.Empty;
                        string SequenceNo = DateTime.Now.ToString("dd/MM/yyyy") + DateTime.Now.ToString("hh:mm:ss");
                        SequenceNo = SequenceNo.Replace("/", "");
                        SequenceNo = SequenceNo.Replace(":", "");
                        IFormFile file = null;
                        if (_DocUpload.Doc_File != null)
                        {
                            filename = string.Empty;
                            file = _DocUpload.Doc_File;
                            fileExt = file.FileName.Split(".")[1];
                            filename = System.IO.Path.GetFileName(file.FileName);
                            filename = _DocUpload.App_No + "_Investor_BANK_CancelCheque_" + SequenceNo + "." + fileExt.ToLower();

                            //WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
                            //{

                                if (fileExt.ToUpper() != "PDF" && fileExt.ToUpper() != "TIFF" && fileExt.ToUpper() != "TIF")
                                {
                                    filename = filename.Split(".")[0] + ".jpeg";
                                    var ImagePath = Path.Combine(_DocUpload.DocPath, filename);
                                    FormFileExtensions.ReduceImageSize(file.OpenReadStream(), ImagePath, 0.8);
                                }
                                else
                                {
                                    FormFileExtensions.SaveFile(_DocUpload.DocPath, filename, file, fileExt);
                                }

                            //});
                            _DocUpload.DocName = filename;
                        }

                        DataTable dt = objDal.SaveCancelledChequeCopy(_DocUpload, session);
                        if (dt == null)
                        {
                            validResponse = false;
                            msg = "Internal server error.";
                        }
                        else
                        {
                            validResponse = true;
                            msg = "Document uploaded successfully.";
                        }

                    }
                    else
                    {
                        validResponse = false;
                        msg = "Selected document could not be uploaded. Exceeding the maximum file size of 4MB !!";
                    }
                }
                else
                {
                    validResponse = false;
                    msg = "File should be jpg, jpeg, pdf, tiff, tif.";
                }
            }
            else
            {
                validResponse = false;
                msg = "Invalid file name, Please uplod valid file.";
            }
            return Ok(new { validResponse, msg });
        }


        //[HttpPost]
        //public async Task<IActionResult> Get_KYCDocumentAsync([FromBody]DocBO docBO)
        //{

        //    SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

        //    using (DataTable dt = await objDAL.Get_KYCDocumentAsync(docBO, session))
        //    {
        //        if (dt != null && dt.Rows.Count > 0)
        //        {
        //            return Ok(dt);
        //        }
        //    }
        //    return NoContent();

        //}

    }


}