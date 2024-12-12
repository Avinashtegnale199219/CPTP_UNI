using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using FD_CPTP_UNIFIED;
using Microsoft.AspNetCore.Http;

namespace FD_UNIFIED_CPTP.App_Code
{
    public static class FormFileExtensions
    {
        public static byte[] GetBytes(IFormFile formFile)
        {
            using (var memoryStream = new MemoryStream())
            {
                formFile.CopyTo(memoryStream);
                return memoryStream.ToArray();
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
                    using (var thumbnailImg = new Bitmap(newWidth, newHeight))
                    {
                        var thumbGraph = Graphics.FromImage(thumbnailImg);
                        thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
                        thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
                        thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
                        thumbGraph.DrawImage(image, imageRectangle);
                        thumbnailImg.Save(targetPath, ImageFormat.Jpeg);
                        thumbnailImg.Dispose();
                    }
                    image.Dispose();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static string CombineImages(FileInfo[] files, string filepath)
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
                    using (Image img = Image.FromFile(file.FullName))
                    {
                        imageHeights.Add(img.Width);
                        height += img.Height;
                        img.Dispose();
                    }
                }
                imageHeights.Sort();
                int width = imageHeights[imageHeights.Count - 1];
                using (Bitmap img3 = new Bitmap(width, height))
                {
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
                        if (File.Exists(file.FullName))
                        {
                            File.Delete(file.FullName);
                        }
                    }
                    g.Dispose();
                    img3.Save(finalImage, ImageFormat.Jpeg);
                    img3.Dispose();
                }
                return finalImage;

            }
            catch (Exception)
            {

                throw;
            }
        }
        public static void SaveWithReducedImageSize(Stream FileStream, string targetPath, double scaleFactor = 0.8)
        {
            try
            {

                using (var image = Image.FromStream(FileStream))
                {
                    if (scaleFactor != 0.8)
                    {
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

                    var newWidth = (int)(image.Width * scaleFactor);
                    var newHeight = (int)(image.Height * scaleFactor);
                    using (var thumbnailImg = new Bitmap(newWidth, newHeight))
                    {
                        var thumbGraph = Graphics.FromImage(thumbnailImg);
                        thumbGraph.CompositingQuality = CompositingQuality.HighQuality;
                        thumbGraph.SmoothingMode = SmoothingMode.HighQuality;
                        thumbGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        var imageRectangle = new Rectangle(0, 0, newWidth, newHeight);
                        thumbGraph.DrawImage(image, imageRectangle);
                        thumbnailImg.Save(targetPath, ImageFormat.Jpeg);
                        thumbnailImg.Dispose();
                    }
                    image.Dispose();

                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        public static string[] ConvertTiffToJpeg(string FilePath)
        {
            try
            {


                using (Image imageFile = Image.FromFile(FilePath))
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
                                Startup.Configuration["TempDocPath"], Path.GetFileNameWithoutExtension(FilePath), frame);
                            bmp.Save(jpegPaths[frame], ImageFormat.Jpeg);
                            bmp.Dispose();
                        }
                    }
                    imageFile.Dispose();

                    return jpegPaths;
                }

            }
            catch (Exception)
            {

                throw;
            }
        }
        public static void SaveFile(string FilePath, string filename, IFormFile file, string fileExt)
        {
            try
            {

                var path = Path.Combine(FilePath, filename);
                if (file.Length > 0)
                {
                    if (fileExt.ToUpper() != "PDF" && fileExt.ToUpper() != "TIFF" && fileExt.ToUpper() != "TIF")
                    {
                        SaveWithReducedImageSize(file.OpenReadStream(), path);
                    }
                    else
                    {
                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            file.CopyTo(stream);
                            stream.Flush();
                        }
                    }

                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static void RotateImageAndSave(string FilePath, string filename, IFormFile file, string fileExt, int RotateType = 0)
        {
            var path = Path.Combine(FilePath, filename);
            try
            {

                //==========================================================
                //var path90 = Path.Combine(FilePath, 90 + filename);
                //var path180 = Path.Combine(FilePath, 180 + filename);
                //var path270 = Path.Combine(FilePath, 270 + filename);

                //if (file.Length > 0)
                //{
                //    using (var stream = new FileStream(path, FileMode.Create))
                //    {
                //        file.CopyTo(stream);
                //    }
                //}

                //using (var image90 = Image.FromStream(file.OpenReadStream()))
                //{
                //    image90.RotateFlip(RotateFlipType.Rotate90FlipNone);
                //    image90.Save(path90);
                //    image90.Dispose();
                //}

                //using (var image180 = Image.FromStream(file.OpenReadStream()))
                //{
                //    image180.RotateFlip(RotateFlipType.Rotate180FlipNone);
                //    image180.Save(path180);
                //    image180.Dispose();
                //}

                //using (var image270 = Image.FromStream(file.OpenReadStream()))
                //{
                //    image270.RotateFlip(RotateFlipType.Rotate270FlipNone);
                //    image270.Save(path270);
                //    image270.Dispose();
                //}


                //==========================================================

                using (var image = Image.FromStream(file.OpenReadStream()))
                {
                    if (RotateType == 90)
                    {
                        image.RotateFlip(RotateFlipType.Rotate90FlipNone);
                    }
                    else if (RotateType == 180)
                    {
                        image.RotateFlip(RotateFlipType.Rotate180FlipNone);
                    }
                    else if (RotateType == 270)
                    {
                        image.RotateFlip(RotateFlipType.Rotate270FlipNone);
                    }
                    image.Save(path);
                    image.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {

            }
        }
    }
}
