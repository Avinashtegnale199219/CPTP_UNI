using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace FD_UNIFIED_CPTP.Models
{
    public class Signzy_Req_BO
    {
        public string OVD_Type { get; set; }
        public string OVD_Number { get; set; }
        public string OVD_HolderDOB { get; set; }
        public string OVD_HolderFirstName { get; set; }
        public string OVD_HolderMiddleName { get; set; }
        public string OVD_HolderLastName { get; set; }
        public byte[] OVD_FrontImage { get; set; }
        public string OVD_FrontImagePath { get; set; }
        public string OVD_FrontImageFileExtension { get; set; }
        public byte[] OVD_BackImage { get; set; }
        public string OVD_BackImagePath { get; set; }
        public string OVD_BackImageFileExtension { get; set; }
        public string OVD_Task { get; set; }
        public Dictionary<string, string> OVD_ForgeryCheck_Parameters { get; set; }
        public string User_Name { get; set; }
        public string Remarks { get; set; }
        public string App_Code { get; set; }
        public string Appl_No { get; set; }
        public string MCP_Code { get; set; }
        public string SCP_Code { get; set; }
        public string MF_Sys_Ref_No { get; set; }
        public string CP_Trans_Ref_No { get; set; }
        public string Source_Type { get; set; }
        public string Source_Sub_Type { get; set; }
        public string Holder_Type { get; set; }
        public string CreatedBy { get; set; }
        public string CreatedByUName { get; set; }
        public string CreatedIP { get; set; }
        public long SessionId { get; set; }
        public IFormFile File { get; set; }
        public List<Parameter> Parameters { get; set; }
        public string DocId { get; set; }

    }

    public class Parameter
    {
        public string key { get; set; }
        public string value { get; set; }
    }
}
