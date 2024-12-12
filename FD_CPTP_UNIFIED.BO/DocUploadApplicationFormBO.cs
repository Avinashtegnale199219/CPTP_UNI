using Microsoft.AspNetCore.Http;

namespace FD_CPTP_UNIFIED.BO
{
    public class DocUploadApplicationFormBO
    {

        public IFormFile Doc_File { get; set; }
        public string App_No { get; set; }
        public string DocName { get; set; }
        public string DocPath { get; set; }
        public string formCode { get; set; }
        public string Session_ID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByUName { get; set; }
        public string CreatedIP { get; set; }

        public string State { get; set; }
        public string Status { get; set; }
        public string FDRNo { get; set; }
        public string FolioNo { get; set; }
        public string LastInvDate { get; set; }
        public int DocSequenceNo { get; set; }
        public string Source { get; set; }
    }

    public class UploadCancelledChequeCopyBO
    {

        public IFormFile Doc_File { get; set; }
        public string App_No { get; set; }
        public string DocName { get; set; }
        public string DocPath { get; set; }

        public string State { get; set; }
        public string Status { get; set; }
        public string FDRNo { get; set; }
        public string FolioNo { get; set; }
        public string LastInvDate { get; set; }
        public string Depositor_Status_Code { get; set; }
        public int DocSequenceNo { get; set; }
    }
}
