using Microsoft.AspNetCore.Http;

namespace FD_CPTP_UNIFIED.BO
{
    public class RTGS_UTR_UPLOAD_BO
    {
        public IFormFile Doc_File { get; set; }
        public string Doc_Type { get; set; }
        public string File_Name { get; set; }
        public string File_Path { get; set; }
        public string Appl_No { get; set; }
        public string UTR_No { get; set; }
        public string DocPath { get; set; }
    }
}
