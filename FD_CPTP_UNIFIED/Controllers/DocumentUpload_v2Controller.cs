//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Drawing;
//using System.Drawing.Drawing2D;
//using System.Drawing.Imaging;
//using System.IO;
//using System.Security.Principal;
//using System.Threading.Tasks;
//using Extension;
//using FD_CPTP_BackOffice.App_Code.DataAccessLayer;
//using FD_CPTP_BackOffice.BusinessObject;
//using Impersonate;
//using MF_FD_CP_QUERY_WINDOW_APP.App_Code.BusinessObject;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace FD_CPTP_BackOffice.v2.Controllers
//{
//    [Produces("Application/json")]
//    public class DocumentUpload_v2Controller : Controller
//    {

       


//        [HttpPost]
//        public IActionResult Save_KYCDocs([FromHeader]DocUploadBO _DocUpload)
//        {
//            DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

//            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
//            session.FormCode = HttpContext.Session.GetString("SubModeCode");


//            ImpersonateUser _imp = new ImpersonateUser();
//            string nasUserId = Startup.Configuration["FS_key:DocUserID"];
//            string nasPassword = Startup.Configuration["FS_key:DocPWD"];
//            _DocUpload.DocPath = Startup.Configuration["FS_key:DocPath"];

//            var type = _DocUpload.Doc_File.ContentType.ToLower();

//            if (_DocUpload.Doc_File == null)
//            {
//                return Ok(new { validResponse = false, msg = "Please select file to upload." });
//            }

//            if (_DocUpload.Doc_File.FileName.Split(".").Length != 2)
//            {
//                return Ok(new { validResponse = false, msg = "Invalid file name, Please uplod valid file." });
//            }

//            if (type != "image/png" && type != "image/jpg" && type != "image/jpeg" && type != "application/pdf" && type != "image/tiff" && type != "image/tif")
//            {
//                return Ok(new { validResponse = false, msg = "File should be in png/jpg/jpeg/pdf/tif/tif format." });
//            }

//            if (_DocUpload.Doc_File.Length > 5000000)
//            {
//                return Ok(new { validResponse = false, msg = "Selected document could not be uploaded. Exceeding the maximum file size of 5MB !!" });
//            }

//            if (!CheckFileContent(_DocUpload.Doc_File))
//            {
//                return Ok(new { validResponse = false, msg = "Invalid file format." });

//            }

//            //file upload

//            string SequenceNo = DateTime.Now.ToString("dd/MM/yyyy") + DateTime.Now.ToString("hh:mm:ss");
//            SequenceNo = SequenceNo.Replace("/", "");
//            SequenceNo = SequenceNo.Replace(":", "");
//            if (_DocUpload.Doc_File != null)
//            {
//                _DocUpload.DocExtention = _DocUpload.Doc_File.FileName.Split(".")[1].ToUpper();

//                _DocUpload.DocName = _DocUpload.App_No + "_" + _DocUpload.HolderTypeText + "_" + _DocUpload.Doc_Type_SubType_Text + "_" + _DocUpload.DocSequenceNo + "_" + SequenceNo + "." + _DocUpload.DocExtention;

//                WindowsIdentity.RunImpersonated(_imp.Login("MMFSL", nasUserId, nasPassword), () =>
//                {

//                    SaveFile(_DocUpload.DocPath, _DocUpload.DocName, _DocUpload.Doc_File, _DocUpload.DocExtention);

//                });
//            }

//            string[] arrayDocType = _DocUpload.Doc_Type_SubType.Split("|");
//            _DocUpload.DocType = arrayDocType[0];
//            _DocUpload.DocSubType = arrayDocType[1];


//            DataTable dt = objDAL.Save_KYCDocs(_DocUpload, session);

//            if (dt == null)
//            {
//                return Ok(new { validResponse = false, msg = "Internal server error." });
//            }

//            return Ok(new { validResponse = true, msg = "Document uploaded successfully." });
//        }

       

//        [HttpPost]
//        public async Task<IActionResult> InsertDocumentUploadLogAsync([FromBody]DocUploadBO DocUpload)
//        {
//            DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

//            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
//            session.FormCode = HttpContext.Session.GetString("SubModeCode");

//            bool result = await objDAL.InsertDocumentUploadLogAsync(DocUpload, session);
//            return Ok(result);
//        }

//        private void SaveFile(string FilePath, string filename, IFormFile file, string fileExt)
//        {
//            try
//            {
//                DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

//                var path = Path.Combine(FilePath, filename);
//                if (file.Length > 0)
//                {
//                    if (fileExt != "PDF" && fileExt != "TIFF" && fileExt != "TIF")
//                    {
//                        SaveWithReducedImageSize(file.OpenReadStream(), path);
//                    }
//                    else
//                    {
//                        using (var stream = new FileStream(path, FileMode.Create))
//                        {
//                            file.CopyTo(stream);
//                        }
//                    }

//                }
//            }
//            catch (Exception ex)
//            {

//                throw ex;
//            }
//        }


//        private string[] ConvertTiffToJpeg(string fileName)
//        {
//            try
//            {
//                DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

//                using (Image imageFile = Image.FromFile(fileName))
//                {
//                    FrameDimension frameDimensions = new FrameDimension(
//                        imageFile.FrameDimensionsList[0]);

//                    // Gets the number of pages from the tiff image (if multipage) 
//                    int frameNum = imageFile.GetFrameCount(frameDimensions);
//                    string[] jpegPaths = new string[frameNum];

//                    for (int frame = 0; frame < frameNum; frame++)
//                    {
//                        // Selects one frame at a time and save as jpeg. 
//                        imageFile.SelectActiveFrame(frameDimensions, frame);
//                        using (Bitmap bmp = new Bitmap(imageFile))
//                        {

//                            jpegPaths[frame] = String.Format("{0}\\{1}_{2}.jpg",
//                                Startup.Configuration["TempDocPath"], Path.GetFileNameWithoutExtension(fileName), frame);
//                            bmp.Save(jpegPaths[frame], ImageFormat.Jpeg);
//                        }
//                    }


//                    return jpegPaths;
//                }

//            }
//            catch (Exception)
//            {

//                throw;
//            }
//        }

//        private void SaveWithReducedImageSize(Stream FileStream, string targetPath, double scaleFactor = 0.8)
//        {
//            try
//            {

//                using (var image = Image.FromStream(FileStream))
//                {
//                    if (scaleFactor != 0.8)
//                    {
//                    }
//                    else if ((image.Width >= 1000 && image.Width < 2000) || (image.Height >= 1000 && image.Height < 2000))
//                    {
//                        scaleFactor = 0.6;
//                    }
//                    else if ((image.Width >= 2000 && image.Width < 4000) || (image.Height >= 2000 && image.Height < 4000))
//                    {
//                        scaleFactor = 0.5;
//                    }
//                    else if ((image.Width >= 4000) || (image.Height >= 4000))
//                    {
//                        scaleFactor = 0.4;
//                    }
//                    else if ((image.Width < 1000) || (image.Height <= 1000))
//                    {
//                        scaleFactor = 0.7;
//                    }

//                    var newWidth = (int)(image.Width * scaleFactor);
//                    var newHeight = (int)(image.Height * scaleFactor);
//                    var thumbnailImg = new Bitmap(newWidth, newHeight);
//                    var thumbGraph = Graphics.FromImage(thumbnailImg);
//                    thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
//                    thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
//                    thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
//                    var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
//                    thumbGraph.DrawImage(image, imageRectangle);
//                    thumbnailImg.Save(targetPath, ImageFormat.Jpeg);
//                }
//            }
//            catch (Exception)
//            {

//                throw;
//            }
//        }


//        private string CombineImages(FileInfo[] files, string filepath)
//        {
//            try
//            {

//                //change the location to store the final image.
//                string finalImage = filepath;
//                List<int> imageHeights = new List<int>();
//                int nIndex = 0;
//                //int width = 0;
//                int height = 0;
//                foreach (FileInfo file in files)
//                {
//                    Image img = Image.FromFile(file.FullName);
//                    imageHeights.Add(img.Width);
//                    height += img.Height;
//                    img.Dispose();
//                }
//                imageHeights.Sort();
//                int width = imageHeights[imageHeights.Count - 1];
//                Bitmap img3 = new Bitmap(width, height);
//                Graphics g = Graphics.FromImage(img3);
//                g.Clear(SystemColors.AppWorkspace);
//                foreach (FileInfo file in files)
//                {
//                    Image img = Image.FromFile(file.FullName);
//                    if (nIndex == 0)
//                    {
//                        g.DrawImage(img, new Point(0, 0));
//                        nIndex++;
//                        height = img.Height;
//                    }
//                    else
//                    {
//                        g.DrawImage(img, new Point(0, height));
//                        height += img.Height;
//                    }
//                    img.Dispose();
//                    if (System.IO.File.Exists(file.FullName))
//                    {
//                        System.IO.File.Delete(file.FullName);
//                    }
//                }
//                g.Dispose();
//                img3.Save(finalImage, System.Drawing.Imaging.ImageFormat.Jpeg);
//                img3.Dispose();

//                return finalImage;
//                //imageLocation.Image = Image.FromFile(finalImage);

//            }
//            catch (Exception)
//            {

//                throw;
//            }
//        }

//        [HttpGet]
//        public async Task<IActionResult> Get_HolderTypeAsync()
//        {

//            DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();
//            using (DataTable dt = await objDAL.Get_HolderTypeAsync())
//            {
//                if (dt != null && dt.Rows.Count > 0)
//                {
//                    return Ok(dt);
//                }

//                return NoContent();
//            }

//        }

//        [HttpGet]
//        public async Task<IActionResult> Get_FilterDocTypeAsync()
//        {
//            DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

//            using (DataTable dt = await objDAL.Get_FilterDocTypeAsync())
//            {
//                if (dt != null && dt.Rows.Count > 0)
//                {
//                    return Ok(dt);
//                }

//                return NoContent();

//            }

//        }

//        public async Task<IActionResult> Get_DocType_MstAsync(string _HolderType, string DepositorStatus)
//        {
//            DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();
//            using (DataTable dt = await objDAL.Get_DocType_MstAsync(_HolderType, DepositorStatus))
//            {
//                if (dt != null && dt.Rows.Count > 0)
//                {
//                    return Ok(dt);
//                }

//                return NoContent();

//            }

//        }


//        [HttpGet]
//        public async Task<IActionResult> Get_SubDocType_MstAsync(string _HolderType, string DepositorStatus)
//        {
//            DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

//            using (DataTable dt = await objDAL.Get_DocType_MstAsync(_HolderType, DepositorStatus))
//            {
//                if (dt != null && dt.Rows.Count > 0)
//                {
//                    return Ok(dt);
//                }

//                return NoContent();

//            }

//        }

//        [HttpGet]
//        public async Task<IActionResult> Get_OVDAsync(string _ApplNo)
//        {
//            DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

//            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
//            session.FormCode = HttpContext.Session.GetString("SubModeCode");

//            using (DataTable dt = await objDAL.Get_OVDAsync(_ApplNo, session))
//            {
//                if (dt != null && dt.Rows.Count > 0)
//                {
//                    return Ok(dt);
//                }

//                return NoContent();

//            }

//        }

//        [HttpGet]
//        public async Task<IActionResult> Get_KYCDocumentAsync(string _ApplNo)
//        {
//            DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();

//            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
//            session.FormCode = HttpContext.Session.GetString("SubModeCode");


//            using (DataTable dt = await objDAL.Get_KYCDocumentAsync(_ApplNo, session))
//            {
//                if (dt != null && dt.Rows.Count > 0)
//                {
//                    return Ok(dt);
//                }
//            }
//            return NoContent();

//        }

//        [HttpGet]
//        public IActionResult Get_KYCDocument_with_Filter(string _ApplNo, string _Filter)
//        {
//            SessionBO session = HttpContext.Session.GetObject<SessionBO>("UserSessionDetails");
//            session.FormCode = HttpContext.Session.GetString("SubModeCode");

//            DocumentUploadDAL_v2 objDAL = new DocumentUploadDAL_v2();
//            using (DataTable dt = objDAL.Get_KYCDocument_with_Filter(_ApplNo, _Filter, session))
//            {
//                if (dt != null && dt.Rows.Count > 0)
//                {
//                    return Ok(dt);
//                }
//            }
//            return NoContent();
//        }

//        public bool CheckFileContent(IFormFile MyFile)
//        {
//            try
//            {
//                string filePath = MyFile.FileName;
//                string filename = Path.GetFileName(filePath);
//                string ext = Path.GetExtension(filename);
//                string contenttype = String.Empty;
//                Stream checkStream = MyFile.OpenReadStream();
//                BinaryReader chkBinary = new BinaryReader(checkStream);
//                Byte[] chkbytes = chkBinary.ReadBytes(0x10);

//                string data_as_hex = BitConverter.ToString(chkbytes);
//                string magicCheck = data_as_hex.Substring(0, 11);

//                //Set the contenttype based on File Extension
//                switch (magicCheck)
//                {
//                    case "89-50-4E-47":
//                        contenttype = "image/png";
//                        break;
//                    case "47-49-46-38":
//                        contenttype = "image/gif";
//                        break;
//                    case "25-50-44-46":
//                        contenttype = "application/pdf";
//                        break;
//                    case "FF-D8-FF-DB":
//                    case "FF-D8-FF-E0":
//                    case "FF-D8-FF-E1":
//                        contenttype = "image/jpeg";
//                        break;
//                    case "49-49-2A-00":
//                    case "4D-4D-00-2A":
//                        contenttype = "application/tiff";
//                        break;
//                }
//                if (contenttype != String.Empty)
//                {
//                    Byte[] bytes = chkBinary.ReadBytes((Int32)checkStream.Length);
//                    return true;
//                }
//                else
//                {
//                    return false;
//                }
//            }
//            catch (Exception ex)
//            {
//                return false;
//            }

//        }


//    }
//}