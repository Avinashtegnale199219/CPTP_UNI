using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Net;
using System.Security.Principal;
using System.Threading.Tasks;
using Extension;
using FD_CPTP_UNIFIED.BO;
using FD_CPTP_UNIFIED.DAL;
using Impersonate;
using MF_FD_ESARATHI_APP.Models;
using MF_FD_ESARATHI_APP.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FD_CPTP_UNIFIED.Controllers
{
    [Route("RenewApplication")]
    public class RenewalRequestEntryController : Controller
    {

        public IActionResult Index()
        {
            var SubModeCode = "RenewApplication";
            Task.Run(() => MenuLog.SaveMenuLog(Startup.Configuration, HttpContext, SubModeCode));

            return View();
        }

        [HttpPost("GetDashboardAsync")]
        public async Task<IActionResult> GetDashboardAsync([FromBody]SearchRenewalRequestBO requestBo)
        {
            var session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            var objDal = new RenewalRequestEntryDAL(Startup.Configuration);

            var dt = await objDal.GetDashboardAsync(requestBo, session);

            if (dt != null && dt.Rows.Count > 0)
                return Ok(new { dt, session.Busi_Broker_Cd });

            return NoContent();
        }

        [HttpPost("Save_Renewal_Request_Entry")]
        public IActionResult Save_Renewal_Request_Entry([FromBody]SaveRenewalRequestEntryBO entryBO)
        {
            SqlTransaction sqlTrans;
            var session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");

            try
            {
                if (!ModelState.IsValid)
                    return Ok(new { status = 0 });

                if (string.IsNullOrEmpty(entryBO.NewBrokerCode))
                    return Ok(new { status = 0, msg = "Business Broker code cannot be empty" });

                var objDal = new RenewalRequestEntryDAL(Startup.Configuration);

                using (var sqlCon = new SqlConnection(Startup.Configuration["ConnectionString:CONN_FDBT"]))
                {
                    if (sqlCon.State != ConnectionState.Open)
                        sqlCon.Open();

                    sqlTrans = sqlCon.BeginTransaction(IsolationLevel.Serializable);

                    try
                    {
                        using (DataTable dt = objDal.Save_Renewal_Request_Entry_BT_TRAN(entryBO, session, sqlCon, sqlTrans))
                        {
                            if (dt != null && dt.Rows.Count > 0)
                            {
                                if (Convert.ToString(dt.Rows[0]["Status"]) == "1" && !string.IsNullOrEmpty(Convert.ToString(dt.Rows[0]["Appl_No"])))
                                {
                                    entryBO.Appl_No = Convert.ToString(dt.Rows[0]["Appl_No"]);
                                    string result = objDal.Save_Renewal_Request_Entry_ORA(entryBO, session);

                                    if (result.ToUpper() == "SUCCESSFUL")
                                    {
                                        sqlTrans.Commit();
                                        return Ok(new { status = 1, msg = result });
                                    }
                                    else
                                    {
                                        sqlTrans.Rollback();
                                        return Ok(new { status = 0, msg = result });
                                    }
                                }
                            }
                            return Ok(new { status = 0, msg = Convert.ToString(dt.Rows[0]["Msg"]) });
                        }
                    }
                    catch (Exception ex)
                    {
                        sqlTrans.Rollback();
                        throw ex;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("Save_Docs")]
        public IActionResult Save_DocsAsync([FromHeader]DocUploadApplicationFormBO _DocUpload)
        {
            bool validResponse = false;
            string msg = string.Empty;
            var session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            var objDal = new RenewalRequestEntryDAL(Startup.Configuration);
            var _imp = new ImpersonateUser();
            string nasUserId = Startup.Configuration["FS_key:DocUserID"];
            string nasPassword = Startup.Configuration["FS_key:DocPWD"];
            _DocUpload.DocPath = Startup.Configuration["FS_key:RenewalDocPath"];

            string[] nameCount = _DocUpload.Doc_File.FileName.Split(".");

            if (nameCount.Length == 2)
            {
                if (!CheckFileContent(_DocUpload.Doc_File))
                    return Ok(new { validResponse = false, msg = "Invalid file format." });

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
                            filename = _DocUpload.FDRNo + "_Investor_ApplicationForm_" + _DocUpload.DocSequenceNo + "_" + SequenceNo + "." + fileExt.ToLower();

                            //WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
                            //{
                                if (fileExt.ToUpper() != "PDF" && fileExt.ToUpper() != "TIFF" && fileExt.ToUpper() != "TIF")
                                {
                                    filename = filename.Split(".")[0] + ".jpeg";
                                    var ImagePath = Path.Combine(_DocUpload.DocPath, filename);
                                    ReduceImageSize(file.OpenReadStream(), ImagePath, 0.8);
                                }
                                else
                                {
                                    SaveFile(_DocUpload.DocPath, filename, file, fileExt);
                                }
                           // });

                            _DocUpload.DocName = filename;
                        }
                        _DocUpload.formCode = "";
                        _DocUpload.Session_ID = "";
                        _DocUpload.CreatedBy = "";
                        _DocUpload.CreatedByUName = "";
                        _DocUpload.CreatedIP = "";

                        DataTable dt = objDal.Save_Docs(_DocUpload, session);
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
                        stream.Flush();
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        public static void ReduceImageSize(Stream FileStream, string targetPath, double scaleFactor = 0)
        {
            try
            {
                using (var image = Image.FromStream(FileStream))
                {
                    if (scaleFactor != 0)
                    {
                        scaleFactor = 0.8;
                    }
                    else if ((image.Width >= 1000 && image.Width < 2000) || (image.Height >= 1000 && image.Height < 2000))
                    {
                        scaleFactor = 0.6;
                    }
                    else if ((image.Width >= 2000 && image.Width < 4000) || (image.Height >= 2000 && image.Height < 4000))
                    {
                        scaleFactor = 0.5;
                    }
                    else if ((image.Width >= 4000) || (image.Height >= 4000))
                    {
                        scaleFactor = 0.4;
                    }
                    else if ((image.Width < 1000) || (image.Height <= 1000))
                    {
                        scaleFactor = 0.7;
                    }
                    else
                    {
                        scaleFactor = 0.8;
                    }
                    var newWidth = (int)(image.Width * scaleFactor);
                    var newHeight = (int)(image.Height * scaleFactor);
                    var thumbnailImg = new Bitmap(newWidth, newHeight);
                    var thumbGraph = Graphics.FromImage(thumbnailImg);
                    thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
                    thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
                    thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                    var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
                    thumbGraph.DrawImage(image, imageRectangle);
                    thumbnailImg.Save(targetPath, ImageFormat.Jpeg);
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static bool CheckFileContent(IFormFile MyFile)
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
            catch (Exception)
            {
                return false;
            }

        }

        [HttpGet("Get_DocsAsync/{FDR_NO}")]
        public async Task<IActionResult> Get_DocsAsync(string FDR_NO)
        {
            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
            session.FormCode = HttpContext.Session.GetString("SubModeCode");

            RenewalRequestEntryDAL objDal = new RenewalRequestEntryDAL(Startup.Configuration);
            DataTable dt = await objDal.Get_DocsAsync(FDR_NO, session);
            if (dt != null && dt.Rows.Count > 0)
            {
                return Ok(dt.ToDynamic());
            }

            return NoContent();
        }

        [HttpGet("Get_ImgFullscreenAsync/{Id}")]
        public async Task<IActionResult> Get_ImgFullscreenAsync(string Id)
        {

            RenewalRequestEntryDAL objDal = new RenewalRequestEntryDAL(Startup.Configuration);
            ImpersonateUser _imp = new ImpersonateUser();
            string nasUserId = Startup.Configuration["FS_key:DocUserID"];
            string nasPassword = Startup.Configuration["FS_key:DocPWD"];
            string imgPath = string.Empty;
            string filename = string.Empty;
            string fileExt = string.Empty;
            string rootPath = string.Empty;
            byte[] byteArry = null;

            WebClient webClient = new WebClient();
            string doc_base64 = string.Empty;
            string doc_Path = string.Empty;
            string status = string.Empty;
            string fileName = string.Empty;
            DataTable dt = await objDal.Get_ImgFullscreenAsync(Id);
            if (dt != null && dt.Rows.Count > 0)
            {
                imgPath = dt.Rows[0][0].ToString();
                filename = dt.Rows[0][1].ToString();
                fileExt = dt.Rows[0][1].ToString().Split(".")[1];
                rootPath = dt.Rows[0][2].ToString();

                //WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword),
           // () =>
            //{
                if (fileExt.ToLower() == "pdf" && imgPath.Length > 0)
                {

                    byteArry = webClient.DownloadData(imgPath);  /// this convert ther byte
                    doc_base64 = "data:application/" + fileExt + ";base64," + Convert.ToBase64String(byteArry);
                    status = "success";
                }
                else if (fileExt.ToLower() == "tif" || fileExt.ToLower() == "tiff")
                {
                    string[] ImgPaths = ConvertTiffToJpeg(imgPath);

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
                    {
                        singleFile = CombineImages(fileinfo, TempPath);
                    }
                    else
                    {
                        singleFile = ImgPaths[0];
                    }


                    byte[] byteData = System.IO.File.ReadAllBytes(singleFile);
                    string imreBase64Data = Convert.ToBase64String(byteData);
                    doc_base64 = "data:application/" + fileExt + ";base64," + Convert.ToBase64String(byteData);
                    status = "success";
                }
                else if (imgPath.Length > 0)
                {
                    byteArry = webClient.DownloadData(imgPath);  /// this convert ther byte
                    doc_base64 = "data:image/" + fileExt + ";base64," + Convert.ToBase64String(byteArry);
                    status = "success";
                }
           // });
            }

            if (status == "success")
            {
                return Ok(new { doc_base64, doc_Path, fileExt, status, byteArry, filename });
            }
            return NoContent();

        }

        [HttpGet("Delete_Doc/{Id}")]
        public IActionResult Delete_Doc(string Id)
        {
            RenewalRequestEntryDAL objDal = new RenewalRequestEntryDAL(Startup.Configuration);
            using (DataTable dt = objDal.Delete_Doc(Id))
            {
                if (dt != null && dt.Rows.Count > 0)
                {
                    return Ok(dt.ToDynamic());
                }
                return NoContent();
            }
        }

        public static string[] ConvertTiffToJpeg(string fileName)
        {
            try
            {

                using (Image imageFile = Image.FromFile(fileName))
                {
                    FrameDimension frameDimensions = new FrameDimension(
                        imageFile.FrameDimensionsList[0]);

                    // Gets the number of pages from the tiff image (if multipage) 
                    int frameNum = imageFile.GetFrameCount(frameDimensions);
                    string[] jpegPaths = new string[frameNum];

                    for (int frame = 0; frame < frameNum; frame++)
                    {
                        // Selects one frame at a time and save as jpeg. 
                        imageFile.SelectActiveFrame(frameDimensions, frame);
                        using (Bitmap bmp = new Bitmap(imageFile))
                        {

                            jpegPaths[frame] = String.Format("{0}\\{1}_{2}.jpg",
                                Startup.Configuration["TempDocPath"], Path.GetFileNameWithoutExtension(fileName), frame);
                            bmp.Save(jpegPaths[frame], ImageFormat.Jpeg);
                        }
                    }


                    return jpegPaths;
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        private string CombineImages(FileInfo[] files, string filepath)
        {
            try
            {

                //change the location to store the final image.
                string finalImage = filepath;
                List<int> imageHeights = new List<int>();
                int nIndex = 0;
                //int width = 0;
                int height = 0;
                foreach (FileInfo file in files)
                {
                    Image img = Image.FromFile(file.FullName);
                    imageHeights.Add(img.Width);
                    height += img.Height;
                    img.Dispose();
                }
                imageHeights.Sort();
                int width = imageHeights[imageHeights.Count - 1];
                Bitmap img3 = new Bitmap(width, height);
                Graphics g = Graphics.FromImage(img3);
                g.Clear(SystemColors.AppWorkspace);
                foreach (FileInfo file in files)
                {
                    Image img = Image.FromFile(file.FullName);
                    if (nIndex == 0)
                    {
                        g.DrawImage(img, new Point(0, 0));
                        nIndex++;
                        height = img.Height;
                    }
                    else
                    {
                        g.DrawImage(img, new Point(0, height));
                        height += img.Height;
                    }
                    img.Dispose();
                    if (System.IO.File.Exists(file.FullName))
                    {
                        System.IO.File.Delete(file.FullName);
                    }
                }
                g.Dispose();
                img3.Save(finalImage, System.Drawing.Imaging.ImageFormat.Jpeg);
                img3.Dispose();

                return finalImage;
                //imageLocation.Image = Image.FromFile(finalImage);

            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}