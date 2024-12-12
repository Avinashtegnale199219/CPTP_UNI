using Microsoft.AspNetCore.Http;

namespace MF_FD_CP_QUERY_WINDOW_APP.App_Code.BusinessObject
{
    public class DocUploadBO
    {
        public string HolderType { get; set; }
        public string DocType { get; set; }
        public string DocSubType { get; set; }
        public string Doc_Type_SubType { get; set; }
        public IFormFile Doc_File { get; set; }
        public string DocName { get; set; }
        public string DocPath { get; set; }
        public string DocSequenceNo { get; set; }
        public string DocExtention { get; set; }
        public string Depositor_Status_Code { get; set; }
        public string App_No { get; set; }
        public string KYCDocValue { get; set; }
        public string formCode { get; set; }
        public string Session_ID { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByUName { get; set; }
        public string CreatedIP { get; set; }
        public string HolderTypeText { get; set; }
        public string Doc_Type_SubType_Text { get; set; }
        public string State { get; set; }
        public string Status { get; set; }
        public string FDRNo { get; set; }
        public string FolioNo { get; set; }
        public string LastInvDate { get; set; }
        public string Event { get; set; }
        public bool IsDocumentMasked { get; set; }
        public string Source { get; set; }
        public string AadharSuffix { get; set; }
    }
}
