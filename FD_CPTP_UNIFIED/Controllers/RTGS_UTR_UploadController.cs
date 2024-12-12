using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Threading.Tasks;
using Extension;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using MF_FD_ESARATHI_APP.Models;
using MF_FD_ESARATHI_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
    [Route("[controller]")]
    public class RTGS_UTR_UploadController : Controller
    {
        private readonly RTGS_UTR_UPLOAD_DAL objDAL;

        public RTGS_UTR_UploadController()
        {
            objDAL = new RTGS_UTR_UPLOAD_DAL(Startup.Configuration);
        }
        public IActionResult Index()
        {
            var SubModeCode = "RTGS_UTR_Upload";
            Task.Run(() => MenuLog.SaveMenuLog(Startup.Configuration, HttpContext, SubModeCode));
            return View();
        }

        [HttpGet("GetRtgsUtrDetails")]
        public ActionResult GetRtgsUtrDetails()
        {
            bool success = false;
            IList<dynamic> rtgsUtrDetailsList = null;
            try
            {
                SessionBO _SessionBO = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
                ;
                using (DataSet dataSet = objDAL.GetRtgsUtrDetails(_SessionBO))
                {
                    if (dataSet != null && dataSet.Tables.Count > 0)
                    {
                        rtgsUtrDetailsList = dataSet.Tables[0].ToDynamic();
                        success = true;
                    }
                    else
                    {
                        rtgsUtrDetailsList = null;
                    }
                }
            }
            catch (Exception ex)
            {
                success = false;
            }
            return Json(new { success, rtgsUtrDetailsList });
        }

        [HttpPost("UploadImage")]
        public ActionResult UploadImage([FromHeader] RTGS_UTR_UPLOAD_BO _DocUpload)//RTGS_UTR_UPLOAD_BO objBo,
        {
            try
            {
                string msg = string.Empty;
                bool success = false;
                if (CheckFileContent(_DocUpload.Doc_File))
                {
                    var type = _DocUpload.Doc_File.ContentType;
                    if (type == "image/png" || type == "image/jpg" || type == "image/jpeg" || type == "application/pdf" || type == "image/tiff" || type == "image/tif")
                    {
                        if (_DocUpload.Doc_File.Length < 5000000)
                        {

                            _DocUpload.DocPath = Startup.Configuration["KYCDocsPath"];
                            string filename = string.Empty;
                            string fileExt = string.Empty;
                            string SequenceNo = DateTime.Now.ToString("dd/MM/yyyy") + DateTime.Now.ToString("hh:mm:ss");
                            SequenceNo = SequenceNo.Replace("/", "");
                            SequenceNo = SequenceNo.Replace(":", "");
                            IFormFile file = null;
                            _DocUpload.File_Path = Startup.Configuration["AppSettings:FileUploadPath"];

                            if (_DocUpload.Doc_File != null)
                            {
                                filename = string.Empty;
                                file = _DocUpload.Doc_File;
                                fileExt = file.FileName.Split(".")[1];
                                filename = System.IO.Path.GetFileName(file.FileName);
                                filename = _DocUpload.Appl_No + "_UTR_" + _DocUpload.UTR_No + "_" + SequenceNo + "." + fileExt.ToLower();
                                try
                                {
                                    string UserId = HttpContext.Session.GetString("UserId");
                                    string SysCode = HttpContext.Session.GetString("SysCode");
                                    SaveFile(_DocUpload.File_Path, filename, file, fileExt);
                                    _DocUpload.File_Name = filename;
                                    _DocUpload.Doc_Type = "UTR";
                                    SessionBO _SessionBO = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
                                    if (!string.IsNullOrEmpty(UserId) && !string.IsNullOrEmpty(SysCode) && _SessionBO != null)
                                    {
                                        int rowsAff = objDAL.Save_UTR_RTGS_Document_Details(_DocUpload, _SessionBO);
                                        if (rowsAff > 0)
                                        {
                                            success = true;
                                            msg = "File Uploaded Successfully.";
                                        }
                                    }
                                    else
                                    {
                                        success = false;
                                        msg = "Something went wrong..!";
                                    }
                                }
                                catch (Exception ex)
                                {
                                    msg = "Invalid File.";
                                }
                            }
                        }
                        else
                        {
                            msg = "Selected document could not be uploaded. Exceeding the maximum file size of 5MB !!";
                        }
                    }
                    else
                    {
                        msg = "File should be png, jpg, jpeg, pdf.";
                    }
                }
                else
                {
                    msg = "Invalid file name, Please uplod valid file.";
                }

                return Json(new { success = success, res = msg });
            }
            catch (Exception ex)
            {
                Task.Run(() => ExceptionUtility.LogExceptionAsync(Startup.Configuration, ex));
                return Json(new { res = "fail" });
            }
        }

        private void SaveFile(string FilePath, string filename, IFormFile file, string fileExt)
        {
            try
            {
                var path = Path.Combine(FilePath, filename);
                if (file.Length > 0)
                {
                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        private bool CheckFileContent(IFormFile MyFile)
        {
            try
            {
                string filePath = MyFile.FileName;
                string filename = Path.GetFileName(filePath);
                string ext = Path.GetExtension(filename);
                string contenttype = String.Empty;
                Stream checkStream = MyFile.OpenReadStream();
                BinaryReader chkBinary = new BinaryReader(checkStream);
                Byte[] chkbytes = chkBinary.ReadBytes(0x10);

                string data_as_hex = BitConverter.ToString(chkbytes);
                string magicCheck = data_as_hex.Substring(0, 11);

                //Set the contenttype based on File Extension
                switch (magicCheck)
                {
                    case "89-50-4E-47":
                        contenttype = "image/png";
                        break;
                    case "47-49-46-38":
                        contenttype = "image/gif";
                        break;
                    case "25-50-44-46":
                        contenttype = "application/pdf";
                        break;
                    case "FF-D8-FF-DB":
                    case "FF-D8-FF-E0":
                    case "FF-D8-FF-E1":
                        contenttype = "image/jpeg";
                        break;
                    case "49-49-2A-00":
                    case "4D-4D-00-2A":
                        contenttype = "application/tiff";
                        break;
                }
                if (contenttype != String.Empty)
                {
                    Byte[] bytes = chkBinary.ReadBytes((Int32)checkStream.Length);
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
            }

        }
    }
}