using ApiRequestor;
using FD_CPTP_UNIFIED;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace FD_OFFLINE_CKYC_UPDATE.App_Code.Services
{
    public class UIDMasking
    {
        public async Task<UIDMaskRespBO> Post(UIDMaskReqBO reqBO)
        {
            try
            {
                UIDMaskRespBO respBO = new UIDMaskRespBO();
                HttpClient client = new HttpClient();
                string requestUri = Convert.ToString(Startup.Configuration["UIDAI:URL"]);

                var response = await client.PostAsJsonAsync<UIDMaskReqBO>(requestUri, reqBO);

                if (response.IsSuccessStatusCode)
                {
                    respBO = response.ContentAsType<UIDMaskRespBO>();
                }
                else
                {
                    var resp = await response.Content.ReadAsStringAsync();
                    throw new Exception("Something went wrong while UID masking. Error: " + resp);
                }
                return respBO;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

    public class UIDMaskReqBO
    {
        public string FileType { get; set; }
        public string FileData { get; set; }
        public int MaskLength { get; set; } = Convert.ToInt32(Startup.Configuration["API:MASK_LENGTH"]);
        public int OutputJpegQuality { get; set; } = Convert.ToInt32(Startup.Configuration["API:OUTPUT_JPEG_QUALITY"]);
        public string Trans_Ref_No { get; set; }
        public string CreatedIP { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByUName { get; set; }
        public string CreatedType { get; set; }
        public string SessionID { get; set; }
        public string Form_Code { get; set; }
        public string Source { get; set; }
        public string API_Response_File_Path { get; set; }
        public string ApplNo { get; set; }
        public string FolioNo { get; set; }
        public string HolderType { get; set; }
        public string PAN { get; set; }
        public string DOB { get; set; }
        public bool CheckDocumentType { get; set; } = true;
        public string AadharSuffix { get; set; }
    }

    public class UIDMaskRespBO
    {
        public string IntStatusCode { get; set; }
        public string Status { get; set; }
        public Result Result { get; set; }
        public string Error { get; set; }
    }

    public class Result
    {
        public string FileData { get; set; }
        public string AadhaarSuffix { get; set; }
    }
}
